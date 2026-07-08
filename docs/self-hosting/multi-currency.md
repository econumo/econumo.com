URL: https://econumo.com/docs/self-hosting/multi-currency/

# Multi-Currency Support

Econumo offers multi-currency functionality. To get started, you need to:

1. Load the currencies you use into your Econumo instance.
2. Set up regular exchange-rate updates (if needed).

---

## How to add a new currency

Econumo preloads **USD** by default (or whatever you set as
`ECONUMO_CURRENCY_BASE`). To use another currency, add it with the
`currency:add` command — pass the ISO code, and optionally a display name and
the number of fraction digits:

```sh
docker compose exec econumo /app/econumo currency:add EUR Euro 2
```

If you want to add several currencies and keep exchange rates up to date, see
the next step.

---

## How to update exchange rates

To keep exchange rates current:

1. Create a free account at [Open Exchange Rates](https://openexchangerates.org).
2. Obtain your App ID from the Open Exchange Rates dashboard.
3. Set the `OPEN_EXCHANGE_RATES_TOKEN` environment variable in your `.env` and
   restart the container.
4. Run the update command (it accepts an optional `YYYY-MM-DD` date, defaulting
   to today):

```sh
docker compose exec econumo /app/econumo currency:update-rates
```

To keep rates fresh, schedule this command from a cron job on the host, e.g.
once a day.

Econumo's base currency defaults to USD and is configurable with the
`ECONUMO_CURRENCY_BASE` environment variable. Note that a free Open Exchange
Rates account only supports USD as its base currency, so keep the base at USD
unless you have a paid plan. The **base currency is not your default
currency** — it is used only for conversions.

For example, if you have most of your accounts in CAD (Canadian Dollar) and one savings account in USD and another in EUR, currency conversions will occur in two scenarios:

1. When you transfer money from your CAD account to your USD/EUR accounts.
2. In your budget, if you choose to convert your spending to other currencies.

Econumo will use the following conversions:

1. CAD ↔ USD directly.
2. CAD → USD (base) → EUR and EUR → USD (base) → CAD

Converting using the base currency usually results in minimal or no difference compared to direct conversions.
