URL: https://econumo.com/docs/self-hosting/backups/

# Backups

`Econumo` does not come with a built-in backup mechanism; it is your responsibility to configure backups for your
instance.

`Econumo` stores its data in SQLite, so it is easy to configure regular backups of your database.
Consider the following well-known options in the SQLite community for effective backup management.

## Regular Cron-based backups

For personal use, a regular cron-based backup may be sufficient. You can find a straightforward guide on setting this up here: https://litestream.io/alternatives/cron/

In addition to your cron schedule, I recommend creating a manual backup before upgrading your `Econumo` version. Storing backups on a separate device is also advisable.

## Litestream

[Litestream](https://litestream.io/getting-started/) is an excellent option that can be configured as a sidecar with `Econumo` in Docker. Follow these steps:

1. Create a manual backup of your database.
2. Enable SQLite WAL mode by running the following command:

```sh
docker-compose exec -u www-data econumo bin/console app:enable-wal
```

3. Create a Litestream configuration file named litestream.yml next to your docker-compose.yml:

```yml
dbs:
  - path: /data/db.sqlite
    replicas:
      # Example for Cloudflare R2:
      - type: s3
        endpoint: https://<REPLACE_WITH_YOUR_VALUE>.r2.cloudflarestorage.com
        bucket: backup-econumo-sqlite
```

4. Add the following environment variables to your `.env` file:

```
LITESTREAM_ACCESS_KEY_ID=<REPLACE_WITH_YOUR_VALUE>
LITESTREAM_SECRET_ACCESS_KEY=<REPLACE_WITH_YOUR_VALUE>
```

5. Incorporate Litestream into your `docker-compose.yml`:

```yml
services:
  econumo:
    image: econumo/econumo-ce:latest
    env_file:
      - .env
    ports:
      - "8181:80"
    volumes:
      - db:/var/www/db
    restart: unless-stopped

  litestream:
    image: litestream/litestream:latest
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

6. Restart Econumo with the command: `docker-compose pull && docker-compose down && docker-compose up -d`
7. Verify that everything is functioning properly.
