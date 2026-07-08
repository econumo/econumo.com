URL: https://econumo.com/docs/self-hosting/cli-commands/

# CLI (terminal) commands

Econumo ships as a single binary that is subcommand-driven: `serve` runs the
server, and everything else is a management command. In the Docker image the
binary lives at `/app/econumo`, so you run commands with `docker exec`:

```sh
docker compose exec econumo /app/econumo <command> [args]
```

Running the binary with no command (or an unknown one) prints the full usage,
so `docker compose exec econumo /app/econumo` is the quickest way to see what
is available on your version.

**Note**
The image is distroless — it has no shell. Run the `/app/econumo` binary
directly as shown above; `docker compose exec econumo bash` will not work.

---
## User management

```sh
# Create a user
docker compose exec econumo /app/econumo user:create "<name>" <email> <password>

# Change a user's email
docker compose exec econumo /app/econumo user:change-email <old-email> <new-email>

# Change a user's password
docker compose exec econumo /app/econumo user:change-password <email> <password>

# Activate or deactivate a user
docker compose exec econumo /app/econumo user:activate <email>
docker compose exec econumo /app/econumo user:deactivate <email>
```

---
## Currencies

```sh
# Add a currency: code, optional name, optional fraction digits
docker compose exec econumo /app/econumo currency:add EUR Euro 2

# Load exchange rates from Open Exchange Rates (optional date, defaults to today)
docker compose exec econumo /app/econumo currency:update-rates
```

See [Multi-Currency Support](/docs/self-hosting/multi-currency/) for the full
setup, including the `OPEN_EXCHANGE_RATES_TOKEN` variable.

---
## Maintenance

```sh
# Generate the RS256 JWT keypair (skips if one already exists; --force overwrites)
docker compose exec econumo /app/econumo jwt:generate
```

**Note**
The JWT keypair is generated automatically on first boot and persisted in the
`jwt` volume (`/app/var/jwt`), so you normally never need to run
`jwt:generate` by hand.
