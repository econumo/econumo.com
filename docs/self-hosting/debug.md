URL: https://econumo.com/docs/self-hosting/debug/

# Overview

Econumo uses the following HTTP response codes:

1. **HTTP 2xx** — everything is fine.
2. **HTTP 4xx** — an error in the user's input.
3. **HTTP 5xx** — a server error.

Every response also carries an `X-Request-Id` header (a UUID). When reporting a
problem, include it — it lets you find the exact request in the logs.

---
## Reading the logs

Econumo writes structured logs to standard output, so you read them with
Docker rather than from a file inside the container:

```sh
docker compose logs -f econumo
```

Each request produces one result line (the operation name, its `status`,
`route`, and `request_id`), logged at `INFO` for 2xx, `WARN` for 4xx, and
`ERROR` for 5xx and recovered panics.

---
## How to debug 5xx errors

If you hit a **500** response, find the matching `ERROR` line in the logs by its
`request_id`. To get more detail, raise the log level and, on a non-public
instance, expose stack traces in the response body:

```dotenv
# in your .env
ECONUMO_LOG_LEVEL=debug
ECONUMO_DEBUG=true
```

Restart the container to apply. `ECONUMO_DEBUG=true` includes the stack trace in
the 500 response envelope — useful while debugging, but leave it off (the
default) on a public instance so internals aren't exposed.

**Note**
The image is distroless and has no shell, so you cannot `exec` into the
container to `tail` a log file. Use `docker compose logs` as shown above.
