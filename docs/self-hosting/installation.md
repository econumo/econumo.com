URL: https://econumo.com/docs/self-hosting/installation/

# Installation

Econumo is a single, self-contained Go binary. It serves both the API and the
web app, runs database migrations by itself on every start, and stores data in
SQLite by default (PostgreSQL is also supported). It is light: the server uses
around 10 MB of RAM.

You can run it with Docker (recommended) or as a plain binary under systemd.

## In this section

- [Docker](/docs/self-hosting/installation/#docker)
- [Without Docker (single binary)](/docs/self-hosting/installation/#without-docker-single-binary)
- [Create the first user](/docs/self-hosting/installation/#create-the-first-user)
- [HTTPS and a reverse proxy](/docs/self-hosting/installation/#https-and-a-reverse-proxy)
- [Upgrading](/docs/self-hosting/installation/#upgrading)

---
## Docker

You need [Docker](https://docs.docker.com/engine/install/) with
[Compose](https://docs.docker.com/compose/install/).

```sh
git clone --single-branch https://github.com/econumo/econumo
cd econumo
cp .env.example .env && chmod 600 .env
docker compose pull && docker compose up -d
```

Then open `http://localhost:8181`. The bundled `docker-compose.yml` runs the
published image `ghcr.io/econumo/econumo:latest`, maps port `8181` on the host
to port `80` in the container, and keeps the SQLite database in the `db`
named volume (`/app/var/db`). The container reports its health to Docker
through the built-in `healthcheck` command, which probes the `/health`
endpoint.

All settings live in `.env`. The defaults work out of the box: SQLite storage
and open registration. See [Configuration](/docs/self-hosting/configuration/)
for everything else.

**Note**
The image is published to the **GitHub Container Registry**
(`ghcr.io/econumo/econumo`). The old Docker Hub image `econumo/econumo-ce`
belongs to v0.x and is no longer updated.

If you'd rather not clone the repository, a minimal `docker-compose.yml` is all
you need next to your `.env`:

```yml
services:
  econumo:
    image: ghcr.io/econumo/econumo:latest
    env_file:
      - .env
    ports:
      - "8181:80"
    volumes:
      - db:/app/var/db
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "/app/econumo", "healthcheck"]
      interval: 1m30s
      timeout: 10s
      retries: 12
      start_period: 30s

volumes:
  db:
```

with a `.env` holding at least:

```dotenv
DATABASE_URL=sqlite:///app/var/db/db.sqlite
PORT=80
ECONUMO_ALLOW_REGISTRATION=true
```

---
## Without Docker (single binary)

Every [release](https://github.com/econumo/econumo/releases/latest) also ships
self-contained Linux binaries for `linux/amd64` and `linux/arm64`, with the web
app embedded. Download the binary for your architecture and verify it.
On arm64 (e.g. a Raspberry Pi), use `econumo-linux-arm64` here and below:

```sh
curl -LO https://github.com/econumo/econumo/releases/latest/download/econumo-linux-amd64
curl -LO https://github.com/econumo/econumo/releases/latest/download/SHA256SUMS
sha256sum --check --ignore-missing SHA256SUMS
```

Create a system user and the directories, install the binary, and write the
environment file:

```sh
sudo useradd --system --home-dir /var/lib/econumo --shell /usr/sbin/nologin econumo
sudo mkdir -p /opt/econumo /var/lib/econumo /etc/econumo
sudo chown econumo:econumo /var/lib/econumo
sudo chmod 700 /var/lib/econumo
sudo install -m 0755 econumo-linux-amd64 /opt/econumo/econumo
sudo install -m 0600 /dev/null /etc/econumo/env
sudoedit /etc/econumo/env
```

A minimal `/etc/econumo/env`:

```dotenv
DATABASE_URL=sqlite:///var/lib/econumo/db.sqlite
PORT=8181
```

Save this unit as `/etc/systemd/system/econumo.service`:

```ini
[Unit]
Description=Econumo personal finance server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=econumo
Group=econumo
WorkingDirectory=/var/lib/econumo
EnvironmentFile=/etc/econumo/env
ExecStart=/opt/econumo/econumo serve
Restart=on-failure
RestartSec=5

# Hardening: the process only ever writes its database directory.
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
ReadWritePaths=/var/lib/econumo
UMask=0077

[Install]
WantedBy=multi-user.target
```

and start it:

```sh
sudo systemctl daemon-reload && sudo systemctl enable --now econumo
```

The binary also reads a `.env` file from its working directory if one exists,
but variables already set in the environment always win.

---
## Create the first user

Open the app and sign up — registration is on by default. Once everyone in
your household has an account, set `ECONUMO_ALLOW_REGISTRATION=false` and
apply it with `docker compose up -d`.

You can also create users from the command line, with registration turned
off:

```sh
docker compose exec econumo /app/econumo user:create "Name" user@example.com password
```

See [CLI commands](/docs/self-hosting/cli-commands/) for this and the other
management commands.

---
## HTTPS and a reverse proxy

Econumo speaks plain HTTP. To reach it from outside your network, put it
behind a reverse proxy that terminates TLS (Caddy, nginx, Traefik, a
Cloudflare Tunnel, …) and forwards requests to port `8181`.

Then tell Econumo its public address:

```dotenv
ECONUMO_URL=https://money.example.com
```

`ECONUMO_URL` adds a link to every email, and it is required for
[single sign-on](/docs/self-hosting/single-sign-on/) and for connecting AI
apps such as Claude to the built-in
[MCP server](/docs/user-guide/ai-assistants/) by signing in.
For MCP it must be an `https` origin with no path (plain `http` is accepted
only for `localhost`).

Some features need the app to be opened over HTTPS (or on `localhost`):
connecting a bank through [SimpleFIN](/docs/user-guide/simplefin/), for
example, because the browser only encrypts the credentials on a secure page.

Behind a proxy, also see
[Reverse proxy and rate limits](/docs/self-hosting/configuration/#reverse-proxy-and-rate-limits).

---
## Upgrading

Back up first (see [Backups](/docs/self-hosting/backups/)), then:

```sh
# Docker
docker compose pull && docker compose up -d

# Single binary: replace the file, then restart
sudo install -m 0755 econumo-linux-amd64 /opt/econumo/econumo
sudo systemctl restart econumo
```

Database migrations run automatically on start. `/app/econumo version` (or
`/opt/econumo/econumo version`) prints the installed version, and the server
checks once a day for a newer release and shows it in **Settings** (set
`ECONUMO_CHECK_UPDATES=false` to turn that off). Release notes are on
[GitHub Releases](https://github.com/econumo/econumo/releases) and on
[econumo.com](/releases/).

### Upgrading from v0.x

v1 is a full rewrite — the PHP backend became the Go binary and the Vue.js
frontend became a React app — but it reuses your database in place: accounts,
passwords and data keep working. The image name, the `.env` variables and the
volumes changed, so follow the
[migration guide](https://github.com/econumo/econumo/blob/main/docs/migration-v0-to-v1.md)
step by step.
