URL: https://econumo.com/docs/self-hosting/backups/

# Backups

Econumo does not come with a built-in backup mechanism; it is your
responsibility to configure backups for your instance.

By default Econumo stores its data in a single SQLite file, so backups are
easy. In the Docker setup that file lives in the `db` volume at
`/app/var/db/db.sqlite` (the path your `DATABASE_URL` points to). The `jwt`
volume (`/app/var/jwt`) holds the JWT keypair — back it up too, or existing
login tokens become invalid after a restore.

**Note**
Always take a manual backup before upgrading your Econumo version, and store a
copy on a separate device.

---
## Simple file copy

The most reliable backup is a copy of the database file taken while nothing is
writing to it. Stop the container, copy the file, and start it again:

```sh
docker compose stop econumo
docker run --rm -v econumo_db:/data -v "$PWD":/backup alpine \
  cp /data/db.sqlite /backup/db-$(date +%F).sqlite
docker compose start econumo
```

(Replace `econumo_db` with your actual volume name — check `docker volume ls`.)

For a scheduled version, run the same copy from a cron job. A short pause while
the container is stopped is fine for a personal instance.

---
## Litestream (continuous replication)

[Litestream](https://litestream.io/getting-started/) streams SQLite changes to
object storage (S3, Cloudflare R2, …) continuously, so you never lose more than
a few seconds of data. It requires the database to be in WAL mode.

**WARNING!**
Econumo runs SQLite with a single pinned connection and does not enable WAL
mode itself. Enabling WAL for Litestream is an advanced setup: take a backup
first, and test a restore before relying on it.

1. Take a manual backup (see above).
2. Enable WAL mode on the database file (one-off; the setting is stored in the
   file). With the container stopped, run it against the copied file, e.g.
   `sqlite3 db.sqlite 'PRAGMA journal_mode=WAL;'`, then put it back.
3. Create a `litestream.yml` next to your `docker-compose.yml`:

```yml
dbs:
  - path: /data/db.sqlite
    replicas:
      # Example for Cloudflare R2:
      - type: s3
        endpoint: https://<REPLACE_WITH_YOUR_VALUE>.r2.cloudflarestorage.com
        bucket: backup-econumo-sqlite
```

4. Provide the credentials to the Litestream service (via its own environment):

```
LITESTREAM_ACCESS_KEY_ID=<REPLACE_WITH_YOUR_VALUE>
LITESTREAM_SECRET_ACCESS_KEY=<REPLACE_WITH_YOUR_VALUE>
```

5. Add Litestream as a sidecar sharing the `db` volume:

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
      - jwt:/app/var/jwt
    restart: unless-stopped

  litestream:
    image: litestream/litestream:latest
    environment:
      - LITESTREAM_ACCESS_KEY_ID
      - LITESTREAM_SECRET_ACCESS_KEY
    volumes:
      - db:/data
      - ./litestream.yml:/etc/litestream.yml
    command: replicate
    restart: unless-stopped
    depends_on:
      - econumo

volumes:
  db:
  jwt:
```

6. Restart the stack: `docker compose pull && docker compose down && docker compose up -d`
7. Verify that replication is working and practice a restore.

---
## PostgreSQL

If you run Econumo on PostgreSQL instead of SQLite (set `DATABASE_URL` to a
`postgres://…` URL), use your usual PostgreSQL backup tooling — for example a
scheduled `pg_dump` — instead of the SQLite steps above.
