# Mastering PostgreSQL Docker Compose for Dev & Prod

Published: April 22, 2026
URL: https://econumo.com/posts/postgresql-docker-compose/

You’re probably in one of two places right now.

Either you need PostgreSQL running locally in the next few minutes so you can build features instead of wrestling with package managers, or you’re self-hosting an app and realizing that the cheerful one-file examples on the internet skip the parts that protect your data.

That gap matters. A disposable dev database and a production database may both start from `postgres` in a Compose file, but they don’t deserve the same defaults. Local convenience is fine on a laptop. It’s reckless on a public server. And if the app stores household finances, budgets, or shared transaction history, sloppy persistence and open ports stop being small mistakes.

A solid postgresql docker compose setup isn’t complicated. It just needs the right boundaries. Start simple, persist data correctly, add health checks, initialize cleanly, back up automatically, and stop publishing the database port when the app can talk to Postgres over a private Docker network instead.

## Why Use Docker Compose for PostgreSQL

Installing PostgreSQL directly on your machine still works. It’s also how teams end up with version drift, broken local environments, and notes in Slack like “mine works on 15, what are you on?”

**Docker Compose fixes that by making the database setup declarative.** The image version, credentials, ports, storage, startup behavior, and app dependencies all live in one file under version control. A new teammate runs one command and gets the same database shape you do.

That’s one reason postgresql docker compose has become the default way many teams handle local and self-hosted database infrastructure. The official `postgres` Docker image has been available since **2015** and had accumulated over **15 billion pulls by 2026**, while Docker enterprise adoption grew from **13% to 85% by 2023**, and PostgreSQL workloads accounted for **over 40% of containerized relational databases** according to the cited summary in [this PostgreSQL Docker Compose overview](https://dev.to/saiful7778/setting-up-postgresql-with-docker-compose-for-development-and-production-45j8).

### What Compose solves well

A good Compose setup gives you a few concrete advantages:

- **Reproducible environments**. Everyone runs the same PostgreSQL version and startup config.
- **Fast resets**. You can tear down and recreate containers without reinstalling the database server.
- **Stack-level visibility**. Your app, database, backup process, and supporting services can live in one project.
- **Safer experiments**. Testing a migration or config tweak is easier when the environment is isolated.

> **Practical rule:** Use direct machine installs when the machine itself is the managed database host. Use Docker Compose when you want repeatable application environments.

### Where Compose helps most

Compose shines in two situations.

The first is **local development**. You want a predictable Postgres instance on `5432`, a known user and password, and the ability to blow away a broken container without touching the rest of your machine.

The second is **self-hosting**. Not because containers magically make databases safer, but because Compose gives you one place to define persistence, restarts, health checks, init scripts, and private networking. Those details are what separate “it starts” from “it survives.”

## Your First PostgreSQL Instance in Five Minutes

The fastest useful setup is still worth doing properly. That means a real volume, explicit environment variables, and a container you can connect to immediately from `psql`, TablePlus, DBeaver, or your app.

Create a file named `docker-compose.yaml`:

```yaml
version: '3.1'

services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Run it:

```bash
docker compose up -d
```

That gives you a working PostgreSQL container listening on `localhost:5432`.

### What each part does

`version: '3.1'` keeps the file format explicit. You’ll see newer examples omit it, but keeping the version visible makes the file easier to reason about when you’re sharing it with a team.

The `db` service uses `postgres:16`, which is a practical starting point for current projects. The image choice matters because it fixes your database runtime to a known version instead of whatever happens to be installed on someone’s machine.

The `ports` section maps **5432** on your host to **5432** inside the container. That’s why GUI clients and local apps can connect using normal PostgreSQL settings.

The `environment` values are the minimum needed by the official image:

- **`POSTGRES_USER`** creates the initial superuser
- **`POSTGRES_PASSWORD`** sets its password
- **`POSTGRES_DB`** creates the initial database

The `volumes` entry mounts a named Docker volume to `/var/lib/postgresql/data`, which is the standard PostgreSQL data directory for this image pattern.

### Connect and verify

Once the container is up, check the logs:

```bash
docker compose logs db
```

Then connect:

```bash
psql -h localhost -U postgres -d app_db
```

If your local workflow includes repeatable app commands, it’s useful to keep them documented alongside your stack commands. A concise example is a project CLI reference like [Econumo self-hosting CLI commands](https://econumo.com/docs/self-hosting/cli-commands/), where operators can find the exact commands they’ll reuse during setup and maintenance.

A quick visual walkthrough can help if you prefer seeing the flow before typing it out:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/DM65_JyGxCo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Keep this setup in the right lane

This file is good for **development**. It is not a production file.

That distinction matters because this example intentionally optimizes for speed:

| Setting | Dev choice | Why it’s fine locally |
|---|---|---|
| Image | `postgres:16` | Predictable and easy to start |
| Password | simple value | Convenient during active development |
| Port mapping | `5432:5432` | Lets tools on your machine connect directly |
| Volume | named volume | Prevents accidental data loss during container rebuilds |

> If you can start your database in a few minutes, you’ll actually use it consistently. If setup takes half an afternoon, people start cutting corners.

## Persisting Data Beyond Container Restarts

A PostgreSQL container without persistent storage is a trap. It works right up until the moment you recreate it and discover your database lived only inside the container filesystem.

That’s why the first serious decision in a postgresql docker compose file isn’t the image tag. It’s **where the data lives**.

### Why named volumes beat bind mounts for most teams

You can persist Postgres data with either a bind mount or a Docker-managed named volume. Both can work. For most application teams, **named volumes are the safer default**.

A bind mount points the database directly at a host folder. That sounds transparent, but it also means you inherit host-level ownership and permission quirks. On Linux and macOS, those problems show up quickly when the Postgres process in the container doesn’t like the file ownership or directory mode it finds on the host.

A named volume avoids most of that friction. Docker manages the storage location, and your Compose file only needs to express the intent: “persist the database here.” That keeps the setup more portable across laptops, CI runners, and servers.

### The correct pattern

Use this shape:

```yaml
services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

This means you can stop and remove the container without deleting the underlying database volume. When a new container starts and mounts `pgdata`, PostgreSQL sees the same data directory and continues from there.

### The version-specific detail people miss

Persistence gets more subtle when image versions change. For financial records or any data you care about, “it probably mounts fine” isn’t good enough.

The key issue called out in [this discussion of PostgreSQL Docker persistence](https://dev.to/xandecodes/spinning-up-postgresql-with-docker-compose-dashboard-g1m) is that **PostgreSQL 18+ uses `/var/lib/postgresql/18/docker` instead of `/var/lib/postgresql/data`**, and using the wrong mount path can cause complete data loss when containers are recreated. That’s exactly the kind of edge case basic tutorials skip and operators remember the hard way.

> Don’t upgrade a Postgres image tag and assume the old volume path is still correct. Check the image’s expected data directory before you touch production.

### Named volume versus bind mount

Here’s the trade-off in practical terms:

| Option | Good at | Weakness |
|---|---|---|
| **Named volume** | Portability, simpler permissions, cleaner Compose files | Less direct visibility on the host |
| **Bind mount** | Easy host-side inspection and manual file access | Permission issues, host coupling, more fragile upgrades |

For a normal app stack, choose **named volumes** first. Reach for bind mounts only when you have a clear operational reason and you understand the ownership model on the host.

### What survives and what doesn’t

A lot of confusion comes from mixing up three different actions:

- **`docker compose stop`** stops the container. Data stays if you use a volume.
- **`docker compose rm`** removes the container. Data still stays if the volume remains.
- **`docker compose down -v`** removes containers and volumes. Your database is gone unless you backed it up.

That last command is where people hurt themselves during cleanup. It looks like a convenient reset. It is. It’s also a storage deletion command.

### A better mental model

Treat the container as **runtime** and the volume as **state**.

The runtime can be replaced. The state cannot be casually discarded. Once you think that way, your Compose choices improve immediately. You stop attaching the database to disposable storage and start planning around continuity, backups, and upgrades.

## Building a Production-Ready Compose File

A production database container should recover from restarts, hide secrets from the Compose file, report when it’s ready, and give the rest of the stack a clean dependency signal. That isn’t overengineering. It’s the minimum for a service you expect to keep running.

Here’s a stronger baseline:

```yaml
version: '3.1'

services:
  db:
    image: postgres:16
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER}']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

The setup above follows the pattern described in [this production-grade PostgreSQL Compose guide](https://www.endpointdev.com/blog/2022/07/running-postgresql-on-docker/), which recommends `postgres:16`, `restart: always`, credentials from a `.env` file, a named volume at `/var/lib/postgresql/data`, and a `pg_isready` healthcheck. That source also notes **99.9% uptime in scaling tests** for the healthcheck-driven setup.

### Use a real environment file

Your `.env` file can look like this:

```env
POSTGRES_USER=financeuser
POSTGRES_PASSWORD=securepass
POSTGRES_DB=app_db
```

The improvement here isn’t that `.env` is magically secure. It isn’t. The benefit is that you stop hardcoding credentials into the Compose file that gets copied into tickets, screenshots, docs, and chat threads.

For a self-hosted deployment, keep `.env` out of version control and rotate credentials when you move from test data to real data.

### Why `restart: always` matters

Servers reboot. Containers exit unexpectedly. A database that stays down until someone notices is a weak operational default.

`restart: always` tells Docker to bring PostgreSQL back after crashes or host restarts. On a personal server, that can be the difference between “the app came back on its own” and “nobody noticed the database was down until dinner.”

### Health checks are more important than startup order

A lot of Compose files use `depends_on` and stop there. That only controls startup sequencing. It does **not** guarantee PostgreSQL is ready to accept connections.

That’s where `pg_isready` helps. Docker can poll the database process until it’s responsive. Your application can then wait for a healthy database instead of crashing because it tried to connect during initialization.

A typical app service looks like this:

```yaml
services:
  app:
    image: your-app-image
    depends_on:
      db:
        condition: service_healthy
```

This is one of the cleanest reliability improvements you can make in a multi-service stack.

> A container being “started” and a database being “ready” are not the same thing.

### Keep development and production separate

One Compose file can be stretched to cover everything, but that usually turns into a mess of conditional behavior. A cleaner pattern is to keep a sensible base and override what changes by environment.

A quick comparison makes the split obvious:

| Concern | Local development | Self-hosted production |
|---|---|---|
| **Credentials** | easy values for speed | values sourced from `.env` |
| **Restart behavior** | optional | `restart: always` |
| **Readiness** | often skipped | healthcheck with `pg_isready` |
| **App dependency** | manual retries are tolerable | `depends_on` with `service_healthy` |
| **Data storage** | named volume | named volume plus backup plan |

### A few production defaults worth adding

Once the basics are in place, these additions usually help:

- **Initialization directory** for first-run SQL scripts.
- **Pinned image tags** so upgrades are deliberate.
- **Log inspection habit** using `docker compose logs db` after every change.
- **Explicit resource tuning** when the app starts doing real work.

If you need PostgreSQL config inline, Compose can pass startup flags directly to the `postgres` process. A common pattern is:

```yaml
command: >
  postgres
  -c max_connections=200
  -c shared_buffers=512MB
  -c effective_cache_size=1GB
  -c work_mem=4MB
  -c wal_buffers=16MB
  -c min_wal_size=512MB
  -c max_wal_size=2GB
```

Those values come from the verified configuration patterns provided for production hardening in the earlier cited Docker Compose guidance. They’re not universal defaults. They’re a starting point you should match to your container memory and workload.

### What doesn’t belong in the production baseline

A lot of examples still include direct host exposure of the database port because it’s convenient. Keep that convenience for local work. Production needs a different posture, which is where hardening comes in next.

## Managing Backups and Initialization Scripts

A database you can start isn’t the same as a database you can recover. The missing pieces are usually **first-run initialization** and **repeatable backups**.

Those two concerns solve different problems. Init scripts create the database state you want on day one. Backups protect the data that accumulates after day one.

### Use init scripts for first boot only

The official Postgres image will automatically run scripts mounted into `/docker-entrypoint-initdb.d/` when the database initializes for the first time.

That makes it a good place for:

- creating roles
- creating additional databases
- enabling extensions
- bootstrapping base schema

A Compose example:

```yaml
services:
  db:
    image: postgres:16
    env_file:
      - .env
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./initdb:/docker-entrypoint-initdb.d
```

If `./initdb` contains an `init.sql`, PostgreSQL will process it during the initial database creation.

A practical `init.sql` might look like this:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

If your app uses fuzzy search or more advanced indexing, you might extend that with other database objects later. The important thing is knowing **when** this mechanism runs.

> Init scripts are not a migration system. They run on first initialization of the data directory, not every time the container starts.

That means if you already have a populated volume, changing `init.sql` won’t retroactively alter the existing database. Use application migrations for ongoing schema changes.

### Add a backup sidecar

For backups, a clean pattern is a dedicated service in the same Compose project. The verified guidance in [this backup and tuning article](https://www.warp.dev/terminus/postgres-docker-compose) recommends a `backup` service using the same `postgres:16` image, sharing the relevant data access and running a cron-driven `pg_dumpall > /backup/full-$(date +%Y%m%d).sql`. That source reports a **99% success rate** when the process is gated with `pg_isready` waits, and notes that inline PostgreSQL tuning via the `command` key can cut team onboarding time by **80%**.

A sidecar shape looks like this:

```yaml
services:
  db:
    image: postgres:16
    env_file:
      - .env
    volumes:
      - pgdata:/var/lib/postgresql/data

  backup:
    image: postgres:16
    env_file:
      - .env
    volumes:
      - ./backup:/backup
    command: >
      sh -c '
      until pg_isready -h db -U "$POSTGRES_USER"; do sleep 2; done;
      pg_dumpall -h db -U "$POSTGRES_USER" > /backup/full-$(date +%Y%m%d).sql
      '
```

This example runs a one-shot backup command. In practice, teams usually wrap that in cron or an external scheduler.

### What to back up and how to test it

A dump file is useful only if you can restore it. For a small self-hosted stack, the backup routine should include three habits:

1. **Create dumps on a schedule**
2. **Store them outside the live container**
3. **Test restore into a separate PostgreSQL instance**

If you want a broader checklist for retention, restore drills, and offsite copies, this guide to [essential database backup strategies](https://cloudvara.com/database-backup-strategies/) is a practical companion to the Compose-level setup.

For app operators, it also helps to keep backup and restore procedures documented in one place. A self-hosting reference like [Econumo backup documentation](https://econumo.com/docs/self-hosting/backups/) is the kind of operational page people return to when they need to verify where backups live and how to restore them.

### Common mistakes that break recoverability

The mistakes repeat across teams:

- **Relying on the volume as the backup**. A volume protects against container recreation, not against operator error or host failure.
- **Using `down -v` casually**. That destroys the persistent volume if you haven’t backed it up.
- **Assuming init scripts handle migrations**. They don’t.
- **Never restoring a backup in test**. A backup you haven’t restored is still unproven.

### When tuning belongs here

Backup planning and configuration tuning often meet in the same review because both are operational concerns. If your workload grows, passing PostgreSQL settings through the Compose `command` key keeps the behavior visible in version control.

Useful examples from the verified guidance include settings such as `shared_buffers`, `effective_cache_size`, `work_mem`, and `max_connections`. For heavier query workloads, adding `shm_size: 1gb` can also be appropriate in Compose-based deployments that hit shared memory limits.

The best part of keeping these choices in the Compose file is that they’re reviewable. Everyone can see when the database started accepting more connections or when memory allocation changed.

## Hardening Your Self-Hosted PostgreSQL

The biggest production mistake in postgresql docker compose setups is also the most common one. People keep `5432:5432` in the server deployment because it was useful during development.

That default is convenient on a laptop. It’s a security liability on a VPS.

The issue called out in [this security discussion about exposed PostgreSQL ports in Docker](https://github.com/laurent22/joplin/issues/11503) is that exposing PostgreSQL through Docker Compose can bypass host firewall rules like `ufw`, which can leave the database publicly reachable. For anyone self-hosting private application data, that’s not a small footnote. It changes the threat model immediately.

### Remove the public port mapping

For production, the database usually doesn’t need to be reachable from your laptop or from the public internet. It only needs to be reachable by the application container.

So remove this:

```yaml
ports:
  - "5432:5432"
```

And replace direct host exposure with a private network:

```yaml
services:
  app:
    image: your-app-image
    depends_on:
      db:
        condition: service_healthy
    networks:
      - internal

  db:
    image: postgres:16
    env_file:
      - .env
    restart: always
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER}']
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - internal
    command: >
      postgres
      -c max_connections=200
      -c shared_buffers=512MB
      -c effective_cache_size=1GB
      -c work_mem=4MB

volumes:
  pgdata:

networks:
  internal:
    driver: bridge
```

With this pattern, the app connects to `db:5432` over Docker’s internal network. Nothing publishes the database port to the host.

> If humans need direct access to production PostgreSQL, make that a deliberate maintenance path. Don’t leave the door open all the time.

### Tune for your workload, not for folklore

Postgres tuning gets noisy fast. People copy giant parameter lists into Compose and call it optimization.

The safer approach is to tune only what matches the workload you run. For a modest self-hosted app, `max_connections`, `shared_buffers`, `effective_cache_size`, and `work_mem` are reasonable candidates. Keep the values in the Compose file so they travel with the deployment and stay visible in code review.

If your app starts using more database-side logic, reporting jobs, or scheduled routines, it’s worth getting comfortable with procedural SQL too. This walkthrough on how to [execute a stored procedure in SQL](https://serverscheduler.com/blog/execute-stored-procedure-in-sql) is a useful reference when your operational scripts move beyond plain `SELECT` and `INSERT`.

### A practical hardening checklist

Use this before calling a self-hosted deployment “done”:

- **No public database port**. App and DB talk on a private Docker network.
- **Secrets outside the Compose file**. Keep credentials in `.env` or a secrets system.
- **Persistent named volume**. Don’t leave state inside the container filesystem.
- **Health checks enabled**. Let dependent services wait for readiness.
- **Restarts configured**. A reboot shouldn’t require manual recovery.
- **Backups tested**. Not just created.
- **Version upgrades planned**. Especially when data directory expectations change.

If you’re running a full self-hosted stack, it helps to keep the app-level deployment docs nearby so database hardening stays aligned with the rest of the system. A practical example is the [Econumo self-hosting documentation](https://econumo.com/docs/self-hosting/), which gives operators one place to verify deployment context instead of treating the database in isolation.

A secure Compose setup is usually less flashy than the quick-start examples. That’s the point. The goal isn’t to show the shortest YAML. The goal is to make the database boring in production, because boring databases are the ones people trust.

---

If you want a privacy-focused finance app that supports self-hosting without forcing you into a cloud-only model, [Econumo](https://econumo.com) is built for that. It gives households and individuals a way to manage budgets, manual transactions, shared accounts, and multi-currency finances while keeping data ownership in their hands.
