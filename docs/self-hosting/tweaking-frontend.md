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

Add the following environment variables to your `.env` file:

```env
LILTAG_CONFIG_URL=liltag-config.json
LILTAG_CACHE_TTL=3600
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

Mount LilTag's configuration file into the Econumo container:

```yaml
services:
  econumo:
    image: econumo/econumo-ce:beta
    env_file:
      - .env
    ports:
      - "8181:80"
    volumes:
      - .liltag-config.json:/usr/share/nginx/html/liltag-config.json:ro,cached
      - db:/var/www/db
    restart: unless-stopped

volumes:
  db:
```

### Step 4

Restart your Docker Compose and check the browser's console.
