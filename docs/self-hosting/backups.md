URL: https://econumo.com/docs/self-hosting/backups/

# Backups

Econumo has no built-in backup mechanism, so setting up backups for your
instance is up to you.

By default Econumo keeps all its data in a single SQLite file, which makes
backups easy. In the Docker setup that file is in the `db` volume, at
`/app/var/db/db.sqlite` (the path in your `DATABASE_URL`). With the
[single binary](/docs/self-hosting/installation/#without-docker-single-binary)
it is wherever your `DATABASE_URL` points, `/var/lib/econumo/db.sqlite` in the
example setup. The database is the only state. Settings live in your `.env`
file (`/etc/econumo/env` for the single binary), so keep a copy of that too.

**Note**
Always take a manual backup before you upgrade Econumo, and keep a copy on a
separate device.

## In this section

- [Simple file copy](/docs/self-hosting/backups/#simple-file-copy)
- [Restoring a backup](/docs/self-hosting/backups/#restoring-a-backup)
- [Litestream (continuous replication)](/docs/self-hosting/backups/#litestream-continuous-replication)
- [PostgreSQL](/docs/self-hosting/backups/#postgresql)

---
## Simple file copy

The most reliable backup is a copy of the database taken while nothing is
writing to it. Stop the stack, copy the files, and start it again:

```sh
docker compose stop
docker run --rm -v econumo_db:/data -v "$PWD":/backup alpine \
  sh -c 'd=/backup/db-$(date +%F) && mkdir -p $d && cp /data/db.sqlite* $d/'
docker compose start
```

The `db.sqlite*` pattern also picks up the `-wal` file, if there is one. In
WAL mode (see [Litestream](/docs/self-hosting/backups/#litestream-continuous-replication)),
recent changes can still be in that file rather than in `db.sqlite`.

Replace `econumo_db` with your volume's actual name. Compose names it
`<project>_db`, after the directory you run `docker compose` from. Check
with `docker volume ls`.

With the single binary:

```sh
sudo systemctl stop econumo
sudo sh -c 'd=/root/econumo-backups/db-$(date +%F) && mkdir -p $d && cp /var/lib/econumo/db.sqlite* $d/'
sudo systemctl start econumo
```

To schedule backups, run the same steps from a cron job. A short pause while
the server is stopped is fine for a personal instance.

---
## Restoring a backup

Stop Econumo, put the file back, and give it to the user the server runs as.
In Docker that is the non-root user with UID/GID **65532**. Stop the whole
stack, not just the app: a running Litestream sidecar keeps the database open
and can write the old data into the restored file.

Set `BACKUP` to the folder the backup command created. The commands check
that it holds a database before they touch the live one, and the stack only
starts again if the copy succeeded:

```sh
BACKUP=db-2026-11-01   # your backup folder
test -f "$BACKUP/db.sqlite" && docker compose stop && \
docker run --rm -v econumo_db:/data -v "$PWD/$BACKUP":/restore:ro alpine \
  sh -c 'rm -rf /data/.old && mkdir /data/.old && mv /data/db.sqlite* /data/.old/ ; cp /restore/db.sqlite* /data/ && chown -R 65532:65532 /data' && \
docker compose start
```

The previous database files are kept in `.old` inside the volume. Delete
that folder once the restored instance works.

As with the backup, replace `econumo_db` with your volume's actual name.
Otherwise Docker quietly creates a new, empty volume and your instance keeps
running on the old data.

With the single binary:

```sh
BACKUP=/root/econumo-backups/db-2026-11-01   # your backup folder
sudo test -f "$BACKUP/db.sqlite" && sudo systemctl stop econumo && \
sudo sh -c "rm -rf /var/lib/econumo/.old && mkdir /var/lib/econumo/.old && mv /var/lib/econumo/db.sqlite* /var/lib/econumo/.old/ ; cp $BACKUP/db.sqlite* /var/lib/econumo/" && \
sudo chown -R econumo:econumo /var/lib/econumo && \
sudo systemctl start econumo
```

The server must be able to write both the file and the directory it is in.
SQLite writes a journal file next to the database. If either one is owned by
root, the server fails to start with `attempt to write a readonly database`.

**Using Litestream?**
Restore from the replica with
[`litestream restore`](https://litestream.io/reference/restore/) rather than
from an old file copy. If you start the stack on a restored file that is older
than the replica, Litestream treats it as the current state and replicates it
over your newer backup.

---
## Litestream (continuous replication)

[Litestream](https://litestream.io/getting-started/) streams SQLite changes to
object storage (S3, Cloudflare R2, …) as they happen, so you never lose more
than a few seconds of data. It needs the database in WAL mode.

**WARNING!**
Econumo uses SQLite through a single connection and does not turn on WAL mode
itself. Enabling WAL for Litestream is an advanced setup: take a backup first,
and test a restore before you rely on it.

1. Take a manual backup (see above).
2. Turn on WAL mode in the database file. You do this once, because the
   setting is stored in the file. With the container stopped, run
   `sqlite3 db.sqlite 'PRAGMA journal_mode=WAL;'` against a copy of the file,
   then put it back as described in
   [Restoring a backup](/docs/self-hosting/backups/#restoring-a-backup).
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

4. Give Litestream its credentials through its own environment:

```
LITESTREAM_ACCESS_KEY_ID=<REPLACE_WITH_YOUR_VALUE>
LITESTREAM_SECRET_ACCESS_KEY=<REPLACE_WITH_YOUR_VALUE>
```

5. Add Litestream as a sidecar that shares the `db` volume:

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

  litestream:
    image: litestream/litestream:latest
    user: "65532:65532"
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
```

6. Restart the stack: `docker compose pull && docker compose down && docker compose up -d`
7. Check that replication works, and practise a restore.

---
## PostgreSQL

If you run Econumo on [PostgreSQL](/docs/self-hosting/configuration/#database-sqlite-or-postgresql)
instead of SQLite, back it up with your usual PostgreSQL tools, for example
a scheduled `pg_dump`, instead of following the SQLite steps above.
