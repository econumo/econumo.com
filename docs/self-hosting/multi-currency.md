URL: https://econumo.com/docs/self-hosting/multi-currency/

# Multi-Currency Support

Econumo works with any number of currencies. On a self-hosted instance you
decide which currencies the server offers, and where the exchange rates come
from.

There are two kinds of currencies:

- **Global currencies** are available to everyone on the instance. You add
  them from the command line, and their rates come from
  [Open Exchange Rates](https://openexchangerates.org).
- **Custom currencies** belong to one user, who creates them under
  [Settings → Currencies](/docs/user-guide/currencies/) and sets their exchange
  rate by hand. Use them for loyalty points, airline miles, or a currency your
  rate provider doesn't carry. You don't need to configure anything for them.

Users choose which global currencies show up in their own pickers, so a long
list on the server does no harm.

## In this section

- [Adding a currency](/docs/self-hosting/multi-currency/#adding-a-currency)
- [Keeping exchange rates up to date](/docs/self-hosting/multi-currency/#keeping-exchange-rates-up-to-date)
- [Filling in missing rates](/docs/self-hosting/multi-currency/#filling-in-missing-rates)
- [The base currency](/docs/self-hosting/multi-currency/#the-base-currency)

---
## Adding a currency

A fresh instance has only **USD**. Add each currency you need with
`currency:add`. Pass the ISO code, and optionally a display name and the number
of fraction digits:

```sh
docker compose exec econumo /app/econumo currency:add EUR Euro 2
docker compose exec econumo /app/econumo currency:add CAD
```

The command is safe to repeat: for a currency that already exists, it says so
and changes nothing.

---
## Keeping exchange rates up to date

1. Create a free account at [Open Exchange Rates](https://openexchangerates.org).
2. Copy your App ID from its dashboard.
3. Set it in your `.env`, and choose how often Econumo refreshes the rates,
   in days (1–31):

```dotenv
OPEN_EXCHANGE_RATES_TOKEN=<your app id>
ECONUMO_CURRENCY_UPDATE_INTERVAL=1
```

4. Restart the container: `docker compose up -d`.

The server loads rates on start and then every N days, for every global
currency it knows. It skips the request while the stored rates are newer than
the interval, so restarts don't use up your API quota.

If you'd rather drive updates yourself, leave
`ECONUMO_CURRENCY_UPDATE_INTERVAL` unset and run the command from a cron job
on the host. It takes an optional `YYYY-MM-DD` date and defaults to today:

```sh
docker compose exec econumo /app/econumo currency:update-rates
```

**Note**
A currency added after the last update has no rate until the next one. Run
`currency:update-rates` once after `currency:add` to fill it in right away.

---
## Filling in missing rates

Econumo converts amounts with the rate for the month they belong to. If you
add a currency later, or the server was off for a while, older months can be
missing rates. Two commands find and fill those gaps:

```sh
# List the months without a rate for any currency in use
docker compose exec econumo /app/econumo currency:show-rate-gaps

# Load them from Open Exchange Rates, starting from a given month
docker compose exec econumo /app/econumo currency:backfill-rates 2025-01
```

Both take an optional end date, and `--daily` to work in days instead of
months. Each missing period costs one API request, so `currency:backfill-rates`
needs a start date. That way a single run can't spend your whole monthly
quota.

---
## The base currency

Econumo stores every rate against one **base currency**: `USD` by default, or
whatever you set in `ECONUMO_CURRENCY_BASE`. The base currency must be a
global currency, otherwise the server does not start. If you change it, add
the currency with `currency:add` first. If the container is already stuck
restarting, run the command in a one-off container:

```sh
docker compose run --rm --entrypoint /app/econumo econumo currency:add EUR Euro 2
```

A free Open Exchange Rates account
only supports USD as the base, so keep `USD` unless you have a paid plan.

The **base currency is not your default currency**. Econumo uses it only for
conversions. Each user picks their own default currency in their
[profile](/docs/user-guide/user-profile/#how-to-change-your-default-currency).

Say most of your accounts are in CAD (Canadian dollar), with one savings
account in USD and another in EUR. Econumo converts currencies when you
transfer money from a CAD account to the USD or EUR account, and when your
budget shows spending in another currency.

With USD as the base, Econumo converts:

1. CAD ↔ USD directly.
2. CAD → USD (base) → EUR, and EUR → USD (base) → CAD.

Converting through the base currency usually gives the same result as a direct
conversion, or very close to it.
