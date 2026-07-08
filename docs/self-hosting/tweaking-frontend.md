URL: https://econumo.com/docs/self-hosting/tweaking-frontend/

# Tweaking the frontend

**WARNING!**
In general, tweaking is not recommended; please do so at your own risk.

Econumo uses the JavaScript tag manager [LilTag](https://github.com/deeravenger/liltag), allowing you to inject any
JavaScript code into your Econumo instance.

I use this mechanism to show a warning message on [demo.econumo.com](https://demo.econumo.com) and to inject analytics scripts.

In this guide, we'll inject the following script into your Econumo:

```html

<script>console.log('Injected!');</script>
```

---

## Configuration

### Step 1

The SPA reads its runtime config from `econumo-config.js`, which already points
`LILTAG_CONFIG_URL` at `liltag-config.json`. To override it (for example to
raise the cache TTL), mount your own `econumo-config.js` — see the commented
line in the shipped `docker-compose.yml`:

```js
window.econumoConfig = {
  // ...keep the other fields...
  LILTAG_CONFIG_URL: 'liltag-config.json',
  LILTAG_CACHE_TTL: 3600,
}
```

### Step 2

Create a [LilTag](https://github.com/flowmitry/liltag) configuration file:

```json
{
  "tags": [
    {
      "id": "test",
      "trigger": "pageLoad",
      "content": "<script>console.log('Injected!');</script>",
      "location": "head"
    }
  ]
}
```

For more details on configuring LilTag, please refer to the [documentation](https://github.com/flowmitry/liltag).

### Step 3

The binary serves the SPA from `/app/web`, so mount your `liltag-config.json`
next to the other static files there:

```yaml
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
      - ./liltag-config.json:/app/web/liltag-config.json:ro
    restart: unless-stopped

volumes:
  db:
  jwt:
```

### Step 4

Restart your Docker Compose and check the browser's console.
