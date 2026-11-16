URL: https://econumo.com/docs/self-hosting/debug/

# Overview

Econumo uses these HTTP response codes:

1. **HTTP 2xx**: everything is fine.
2. **HTTP 4xx**: a problem with the user's input.
3. **HTTP 5xx**: a server error.

Every response also carries an `X-Request-Id` header (a UUID). Include it when
you report a problem: it finds the exact request in the logs.

## In this section

- [Is the server up?](/docs/self-hosting/debug/#is-the-server-up)
- [Reading the logs](/docs/self-hosting/debug/#reading-the-logs)
- [How to debug 5xx errors](/docs/self-hosting/debug/#how-to-debug-5xx-errors)
- [The server does not start](/docs/self-hosting/debug/#the-server-does-not-start)

---
## Is the server up?

`GET /health` returns `200` when the server is healthy. Docker checks it
through the image's built-in healthcheck, so `docker compose ps` shows the
container as `healthy` or `unhealthy`. You can also probe it by hand:

```sh
curl -i http://localhost:8181/health
docker compose exec econumo /app/econumo healthcheck; echo $?   # 0 = healthy
```

---
## Reading the logs

Econumo writes structured logs to standard output, not to a file:

```sh
# Docker
docker compose logs -f econumo

# Single binary under systemd
journalctl -u econumo -f
```

Each request produces one result line with the operation name, its `status`,
its `route` and its `request_id`. The line is logged at `INFO` for 2xx, `WARN`
for 4xx, and `ERROR` for 5xx and recovered panics. On start-up the server also
logs the database engine, the version, and the migrations it applied.

---
## How to debug 5xx errors

If you get a **500** response, find the matching `ERROR` line in the logs by
its `request_id`. For a crash (a recovered panic), the log has a separate
`panic recovered` record with the full stack trace. The response body itself
never contains internals, so it is safe to show to users.

For more detail, raise the log level and apply it with `docker compose up -d`:

```dotenv
# in your .env
ECONUMO_LOG_LEVEL=debug
```

At `debug`, every request also logs a transport line. Management commands take
`-v`, `-vv` or `-vvv` for the same effect, e.g.
`docker compose exec econumo /app/econumo currency:update-rates -v`.
Set the level back to `info` when you are done.

**Note**
Older versions had an `ECONUMO_DEBUG` variable that put stack traces in the
500 response. It no longer exists: stack traces only ever go to the log.

---
## The server does not start

The server checks its configuration at start-up and stops with a clear
message rather than running half-configured. Look at the last lines of
`docker compose logs econumo`. Common causes:

- **`PORT is required`** or a missing `DATABASE_URL`: the two required
  variables are not set.
- **A malformed value**: a typo in a number or a boolean, e.g.
  `ECONUMO_CURRENCY_UPDATE_INTERVAL=daily`. The message names the variable.
- **An incomplete sign-in provider**: some of a provider's variables are set
  but not all, or `ECONUMO_URL` is missing. See
  [Single sign-on](/docs/self-hosting/single-sign-on/).
- **`ECONUMO_CURRENCY_BASE="…" does not match any global currency`**: add
  the currency with `currency:add` first. See
  [Multi-Currency Support](/docs/self-hosting/multi-currency/).
- **`attempt to write a readonly database`**: the database file or its
  directory is not owned by the container user (UID 65532). This often
  happens after a restore or a v0.x upgrade. See
  [Restoring a backup](/docs/self-hosting/backups/#restoring-a-backup).

**Note**
The image is distroless and has no shell, so you cannot `exec` into the
container to look around. Use `docker compose logs` and the `/app/econumo`
commands shown above.
