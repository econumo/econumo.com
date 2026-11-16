URL: https://econumo.com/docs/self-hosting/configuration/

# Configuration

Econumo is configured entirely through environment variables. There is no
admin screen. With Docker they go in `.env`. With the single binary they go in
`/etc/econumo/env` (see [Installation](/docs/self-hosting/installation/)).
After a change, apply it with `docker compose up -d`, which recreates the
container (`docker compose restart` keeps the old values), or with
`sudo systemctl restart econumo`.

The repository has two templates:

- [`.env.example`](https://github.com/econumo/econumo/blob/main/.env.example)
  holds the settings most setups need.
- [`docs/full.env.example`](https://github.com/econumo/econumo/blob/main/docs/full.env.example)
  is the commented reference for every setting.

This page walks through the ones you are most likely to touch.

**Note**
Values are checked strictly at start-up. A typo in a number or a boolean, or a
sign-in provider with a variable missing, stops the server with a message that
names the variable. If the container keeps restarting, check
`docker compose logs econumo`.

## In this section

- [Essentials](/docs/self-hosting/configuration/#essentials)
- [Database: SQLite or PostgreSQL](/docs/self-hosting/configuration/#database-sqlite-or-postgresql)
- [Email](/docs/self-hosting/configuration/#email)
- [Sign-up and access](/docs/self-hosting/configuration/#sign-up-and-access)
- [Optional features](/docs/self-hosting/configuration/#optional-features)
- [Reverse proxy and rate limits](/docs/self-hosting/configuration/#reverse-proxy-and-rate-limits)

---
## Essentials

| Variable | Default | What it does |
|---|---|---|
| `DATABASE_URL` | — (required) | Where the data lives. The scheme picks the engine: `sqlite://…` or `postgres://…`. |
| `PORT` | — (required) | The HTTP port. Keep `80` in Docker; the bundled compose file maps it to `8181`. |
| `ECONUMO_URL` | — | The public URL of your instance, e.g. `https://money.example.com`. It adds a link to emails, and you need it for [single sign-on](/docs/self-hosting/single-sign-on/) and for connecting AI apps by signing in. |
| `ECONUMO_ALLOW_REGISTRATION` | `true` | Lets new users sign up. Turn it off once everyone has an account. |
| `ECONUMO_CURRENCY_BASE` | `USD` | The base currency for conversions. See [Multi-Currency Support](/docs/self-hosting/multi-currency/). |
| `OPEN_EXCHANGE_RATES_TOKEN` | — | The App ID that fetches exchange rates. |
| `ECONUMO_CURRENCY_UPDATE_INTERVAL` | off | Refreshes exchange rates automatically every N days (1–31). |
| `ECONUMO_LOG_LEVEL` | `info` | `debug`, `info`, `warn` or `error`. See [Debug](/docs/self-hosting/debug/). |

---
## Database: SQLite or PostgreSQL

SQLite is the default and needs no setup: the whole database is one file, and
backing it up means copying that file. For a household instance it is the
right choice.

To run on PostgreSQL, point `DATABASE_URL` at an empty database. Econumo
creates the schema on first start:

```dotenv
DATABASE_URL=postgres://econumo:econumo@postgres:5432/econumo?sslmode=disable
```

The repository's `docker-compose.yml` contains a commented-out `postgres`
service (and a `pgdata` volume) that matches this URL. Uncomment both to run
PostgreSQL next to the app.

### Moving an existing instance from SQLite to PostgreSQL

The `data:import-sqlite` command copies everything from a SQLite file into the
PostgreSQL database that `DATABASE_URL` points to:

1. Back up the SQLite file (see [Backups](/docs/self-hosting/backups/)).
2. Stop the whole stack (`docker compose stop`), including a Litestream
   sidecar if you have one, so nothing writes to the SQLite file during the
   copy.
3. Set `DATABASE_URL` to the new PostgreSQL database. If you use the bundled
   `postgres` service, start it and wait until it is healthy:
   `docker compose up -d postgres`.
4. Run the import, with the SQLite file still reachable by the binary. In
   Docker the old `db` volume is still mounted at `/app/var/db`:

   ```sh
   docker compose run --rm --entrypoint /app/econumo econumo data:import-sqlite /app/var/db/db.sqlite
   ```

5. Start Econumo again: `docker compose up -d`.

The command creates the schema if needed and prints the number of rows copied
per table. It refuses to write into a database that already has data. Add
`--force` to wipe the target and copy again.

---
## Email

Econumo sends email for password resets, verification codes and email
changes. With no mailer configured, emails are printed to the server log
instead. That is fine for trying Econumo out, but users cannot reset a
forgotten password themselves.

Set `MAILER_DSN` to one of:

```dotenv
# Resend
MAILER_DSN=resend://re_xxxxxxxx?from=noreply@yourdomain.com&reply_to=support@yourdomain.com
# Any SMTP server with STARTTLS (default port 587)
MAILER_DSN=smtp://user:pass@smtp.example.com:587?from=Econumo%20%3Cnoreply@yourdomain.com%3E
# SMTP over TLS (default port 465)
MAILER_DSN=smtps://user:pass@smtp.example.com:465?from=noreply@yourdomain.com
# A relay without TLS on a trusted network, e.g. a Postfix container
MAILER_DSN=smtp://postfix:25?from=noreply@yourdomain.com&insecure=true
```

Percent-encode special characters in the user name and password (`@` becomes
`%40`, `/` becomes `%2F`, `:` becomes `%3A`).

---
## Sign-up and access

| Variable | Default | What it does |
|---|---|---|
| `ECONUMO_ALLOW_REGISTRATION` | `true` | Open sign-up. When it is off, create users with [`user:create`](/docs/self-hosting/cli-commands/#user-management). |
| `ECONUMO_EMAIL_VERIFICATION` | `false` | New users must confirm their email with a code at their first sign-in. Configure `MAILER_DSN` first, otherwise the codes only reach the server log. |
| `ECONUMO_PASSWORD_LOGIN` | `true` | Set `false` to allow sign-in only through a provider. See [Single sign-on](/docs/self-hosting/single-sign-on/#provider-only-sign-in). |
| `ECONUMO_TRIAL` | `0` | Trial length, in days, for users who sign up themselves. After the trial they become read-only. `0` means full access forever. |
| `ECONUMO_ALLOW_CUSTOM_API` | `false` | Shows the "use my own server" option on the sign-in and sign-up pages. |

To give a user full access again, or to make one read-only, use
[`user:set-access`](/docs/self-hosting/cli-commands/#user-management).

Single sign-on with Google, Apple or your own OpenID Connect provider
(Authentik, Keycloak, Cloudflare Access, …) has its own page:
[Single sign-on](/docs/self-hosting/single-sign-on/).

---
## Optional features

| Variable | Default | What it does |
|---|---|---|
| `ECONUMO_IMPORT_SIMPLEFIN` | `true` | Bank sync through [SimpleFIN Bridge](/docs/user-guide/simplefin/), a third-party service not affiliated with Econumo. Set `false` to hide it. [CSV import](/docs/user-guide/csv-import-export/) and [Apple Wallet](/docs/user-guide/apple-wallet/) are always on. |
| `ECONUMO_IMPORT_ALLOW_PRIVATE_HOSTS` | `false` | Lets SimpleFIN reach private or LAN addresses. Turn it on only for a bridge on your own network. |
| `ECONUMO_FEEDBACK` | `true` | The in-app **Send feedback** form. Messages go from the browser to econumo.com. |
| `ECONUMO_CHECK_UPDATES` | `true` | A daily check for new releases: one request to econumo.com. |

**Note**
In v1.7.3 and earlier, SimpleFIN is **off** by default. Set
`ECONUMO_IMPORT_SIMPLEFIN=true` to turn it on.

### AI apps (MCP)

Econumo has a built-in [MCP server](/docs/user-guide/user-profile/#connected-apps)
at `<ECONUMO_URL>/mcp`. Users connect Claude, Claude Code or Codex to it by
signing in through the browser. This works only when `ECONUMO_URL` is set to an
`https` origin with no path. Without it, `/mcp` accepts only
[API tokens](/docs/user-guide/user-profile/#api-tokens).

Claude on the web, desktop and mobile connects from Anthropic's servers, so
for those the instance must be reachable from the internet. Claude Code and
Codex only need to reach it from the user's computer.

---
## Reverse proxy and rate limits

Econumo rate-limits sign-in attempts, password resets, sign-ups and a few
other sensitive endpoints, per email address and per client IP. It also caps
requests per endpoint per client IP (`ECONUMO_RATE_LIMIT_IP`, 60 a minute).

Behind a reverse proxy every request seems to come from the proxy's address,
so all your users share one limit. Tell Econumo which header carries the real
client IP:

```dotenv
# e.g. behind Cloudflare
ECONUMO_CLIENT_IP_HEADER=CF-Connecting-IP
# or list your proxies; the header then defaults to X-Forwarded-For
ECONUMO_CLIENT_IP_TRUSTED_PROXIES=10.0.0.0/8,172.16.0.0/12
```

Make sure only the proxy can reach Econumo directly. Otherwise a client can
send the header itself.

Every limit has its own variable (`ECONUMO_RATE_LIMIT_LOGIN`,
`ECONUMO_RATE_LIMIT_REGISTER`, …, over the `ECONUMO_RATE_LIMIT_WINDOW`
window, 15 minutes by default), and `0` turns a check off. See
[`full.env.example`](https://github.com/econumo/econumo/blob/main/docs/full.env.example)
for the list.

**Note**
`ECONUMO_CLIENT_IP_HEADER`, `ECONUMO_CLIENT_IP_TRUSTED_PROXIES` and
`ECONUMO_RATE_LIMIT_IP` arrive in the release after v1.7.3. In v1.7.3 and
earlier, the per-endpoint cap is `ECONUMO_RATE_LIMIT_GLOBAL`, and it is shared
by all clients.
