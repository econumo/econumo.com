URL: https://econumo.com/docs/api/

# Econumo API

Econumo includes a REST API and OpenAPI (Swagger) documentation.

The Swagger UI is accessible at the `api/doc` URL. For example, in the demo environment, it can be found here: [https://demo.econumo.com/api/doc](https://demo.econumo.com/api/doc).

The documentation features only `GET` and `POST` HTTP methods. The `GET` method is used for reading data, while the `POST` method is used for modifying data (creating, changing, or deleting).

## In this section

- [Econumo API](/docs/api/#econumo-api)
- [System endpoints](/docs/api/#system-endpoints)
  - [Health check](/docs/api/#health-check)

---

## Econumo API

All methods except those under `/api/v1/system` are part of the **User API**.

To use the **User API**, you need to authorize by using the `/api/v1/user/login-user` method, which will provide an access token
in response. Include this **Bearer** token in the `Authorization` header for your requests, for example:

```
Authorization: Bearer {ACCESS_TOKEN}
```

---

## System endpoints

### Health check

Econumo includes a `/_/health-check` endpoint. For example: https://demo.econumo.com/_/health-check.

You can configure your monitoring tools to check if Econumo is functioning properly.

---

## System API

The System API was deprecated in version 0.8.0 and will be removed in version 1.0.0.

All methods under `/api/v1/system` are part of the **System API**. These methods are designed to manage the Econumo
instance itself, such as updating currency rates.

To use them, you must specify the `ECONUMO_SYSTEM_API_KEY` environment variable with a unique string. You will use this
as a token in the `Authorization` header:

```
Authorization: {ECONUMO_SYSTEM_API_KEY}
```

If `ECONUMO_SYSTEM_API_KEY` is empty, you will not be able to use the **System API**.
