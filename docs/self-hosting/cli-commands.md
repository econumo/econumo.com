URL: https://econumo.com/docs/self-hosting/cli-commands/

# CLI (terminal) commands

Econumo provides several CLI commands that are useful for managing the application.

---
## List of available commands

### Application-specific:

```sh
docker-compose exec -u www-data econumo bin/console | grep app:
```

### All available commands:

```sh
docker-compose exec -u www-data econumo bin/console
```

---
## CLI commands

### Add a new currency

```sh
docker-compose exec -u www-data econumo bin/console app:add-currency --help
```

### Create a user

```sh
docker-compose exec -u www-data econumo bin/console app:create-user --help
```

### Change user e-mail

```sh
docker-compose exec -u www-data econumo bin/console app:change-user-email --help
```

### Change user password

```sh
docker-compose exec -u www-data econumo bin/console app:change-user-password --help
```
