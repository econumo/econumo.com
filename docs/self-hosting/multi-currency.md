URL: https://econumo.com/docs/self-hosting/multi-currency/

# Multi-Currency Support

Econumo offers multi-currency functionality. To get started, you need to:

1. Load currencies into your Econumo instance.
2. Set up a daily update for exchange rates (if needed).

---

## How to add a new currency to Econumo (v0.5.1+)

If you want to use a currency other than **USD** (the only preloaded currency in Econumo), simply run the following command (available since v0.5.1):

```sh
docker-compose exec -u www-data econumo bin/console app:add-currency --help
```

If you want to add multiple currencies and require regular exchange rate updates, see the next step.

---

## How to update exchange rates (v0.8.0+)

To simplify the process of updating exchange rates for currencies you have, please follow these steps:

1. Create a free account at [Open Exchange Rates](https://openexchangerates.org).
2. Obtain your App ID from the Open Exchange Rates dashboard.
3. Set the environment variable `OPEN_EXCHANGE_RATES_TOKEN` in your Econumo instance.
4. Run the following command to load currencies and update exchange rates:

```sh
docker-compose exec -u www-data econumo bin/console app:update-currency-rates
```

Please note that a free version of Open Exchange Rates only supports USD as the base currency. The **base currency is not your default currency** - it’s simply only for conversions.

For example, if you have most of your accounts in CAD (Canadian Dollar) and one savings account in USD and another in EUR, currency conversions will occur in two scenarios:

1. When you transfer money from your CAD account to your USD/EUR accounts.
2. In your budget, if you choose to convert your spending to other currencies.

Econumo will use the following conversions:

1. CAD ↔ USD directly.
2. CAD → USD (base) → EUR and EUR → USD (base) → CAD

Converting using the base currency usually results in minimal or no difference compared to direct conversions.
