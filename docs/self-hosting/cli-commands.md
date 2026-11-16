URL: https://econumo.com/docs/self-hosting/cli-commands/

# CLI (terminal) commands

Econumo ships as a single binary driven by subcommands. `serve` runs the
server, and the `resource:action` commands handle management. In the Docker
image the binary is `/app/econumo`, so you run commands with `docker compose exec`:

```sh
docker compose exec econumo /app/econumo <command> [args]
```

With the [single binary](/docs/self-hosting/installation/#without-docker-single-binary),
run commands as the service user, with the environment file loaded the same
way systemd loads it for the service:

```sh
sudo systemd-run --uid=econumo --gid=econumo --pipe --wait --collect \
  -p EnvironmentFile=/etc/econumo/env -p WorkingDirectory=/var/lib/econumo \
  /opt/econumo/econumo <command> [args]
```

Don't load the file with `. /etc/econumo/env` in a shell: values with `&`,
such as a `MAILER_DSN` with several parameters, are cut short there.

Run the binary with no command, or with `help`, to print every command your
version has.

**Note**
The image is distroless: it has no shell. Run the `/app/econumo` binary
directly as shown above. `docker compose exec econumo bash` does not work.

## In this section

- [Server](/docs/self-hosting/cli-commands/#server)
- [User management](/docs/self-hosting/cli-commands/#user-management)
- [Currencies](/docs/self-hosting/cli-commands/#currencies)
- [Data](/docs/self-hosting/cli-commands/#data)
- [Access tokens and apps](/docs/self-hosting/cli-commands/#access-tokens-and-apps)

---
## Server

```sh
econumo serve         # start the server (the image's entrypoint)
econumo healthcheck   # probe the running server's /health endpoint; exit code 0 or 1
econumo version       # print the version
```

Any command takes `-v`, `-vv` or `-vvv` for debug output and `-q` for quiet.

---
## User management

```sh
# Create a user (works even when registration is off)
docker compose exec econumo /app/econumo user:create "<name>" <email> <password>

# Show a user's profile and access level
docker compose exec econumo /app/econumo user:show <email>

# Change a user's email or password
docker compose exec econumo /app/econumo user:change-email <old-email> <new-email>
docker compose exec econumo /app/econumo user:change-password <email> <password>

# Mark a user's email as verified (with ECONUMO_EMAIL_VERIFICATION on)
docker compose exec econumo /app/econumo user:verify-email <email>

# Activate or deactivate a user
docker compose exec econumo /app/econumo user:activate <email>
docker compose exec econumo /app/econumo user:deactivate <email>

# Set access: full or readonly, optionally until a date
docker compose exec econumo /app/econumo user:set-access <email> full
docker compose exec econumo /app/econumo user:set-access <email> full 2027-01-01
```

`user:set-access` matters when you use a trial (`ECONUMO_TRIAL`). It gives a
user whose trial ended full access again, or makes a user read-only. Pass a
date to make the access level expire.

---
## Currencies

```sh
# Add a currency for everyone: code, optional name, optional fraction digits
docker compose exec econumo /app/econumo currency:add EUR Euro 2

# Load exchange rates from Open Exchange Rates (optional date, defaults to today)
docker compose exec econumo /app/econumo currency:update-rates
docker compose exec econumo /app/econumo currency:update-rates 2026-10-31

# List the months (or days) with no rate for a currency in use
docker compose exec econumo /app/econumo currency:show-rate-gaps [start] [end] [--daily]

# Load the missing rates, one API request per month (or per day)
docker compose exec econumo /app/econumo currency:backfill-rates <start> [end] [--daily]
```

Dates are `YYYY-MM-DD` or `YYYY-MM`. See
[Multi-Currency Support](/docs/self-hosting/multi-currency/) for the full
setup.

---
## Data

```sh
# Copy all data from a SQLite file into the PostgreSQL database in DATABASE_URL
# (with Econumo stopped and DATABASE_URL already pointing at PostgreSQL)
docker compose run --rm --entrypoint /app/econumo econumo data:import-sqlite [--force] <sqlite-path>

# Upgrading from v0.x only: decrypt emails so ECONUMO_DATA_SALT can be removed
docker compose exec econumo /app/econumo data:remove-salt
```

See [Moving from SQLite to PostgreSQL](/docs/self-hosting/configuration/#moving-an-existing-instance-from-sqlite-to-postgresql)
and the
[v0 to v1 migration guide](https://github.com/econumo/econumo/blob/main/docs/migration-v0-to-v1.md).

The `migration:*` commands are one-off data repairs. The server runs them
by itself during upgrades, so you don't need to run them.

---
## Access tokens and apps

```sh
# Delete expired or revoked access tokens older than N days (default 30)
docker compose exec econumo /app/econumo token:purge [days]
```

The next release adds `app:*` commands for the OAuth apps that AI clients
use to connect to the [MCP server](/docs/user-guide/user-profile/#connected-apps).
Clients such as Claude and Codex register themselves, so you only need these
commands to inspect, disconnect or remove apps:

```sh
app:list [--global] [--user]                # list apps
app:show <id>                               # an app and its connections
app:disconnect <id> [--user <user-id>]      # revoke an app's connections
app:delete <id>                             # revoke and delete an app
app:register <name> <redirect-uri>... [--public]   # register an app open to every user
app:update <id> [--name <name>] [--redirect-uri <uri>]...
app:make-global <id>                        # open a user's app to every user
app:rotate-secret <id>                      # replace a confidential app's secret
```

**Note**
Earlier versions had a `jwt:generate` command and a `jwt` volume. Econumo now
uses opaque access tokens stored in the database, so neither is needed. You
can remove the `jwt` volume from your `docker-compose.yml`.
