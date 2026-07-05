URL: https://econumo.com/docs/self-hosting/debug/

# Overview

Econumo uses the following HTTP response codes:

1. **HTTP 2xx** - Indicates that everything is fine.
2. **HTTP 4xx** - Indicates errors related to the user's input.
3. **HTTP 5xx** - Indicates server errors.

---

## How to debug 5xx errors

If you encounter a **500 HTTP error code**, use the following command to check the application's logs:

```
docker-compose exec -u www-data econumo tail -f /var/www/var/log/prod.log
```
