URL: https://econumo.com/docs/user-guide/multi-currency/

# Multi-Currency

Econumo lets you keep accounts in different currencies and still budget across
all of them. Each account has one fixed currency; transfers between currencies
record both amounts, and your budget converts everything to a single currency
so the totals add up.

In the examples on this page, John's family keeps most accounts in US dollars
but also has a **Euro Cash** account they top up before travelling to Italy.

## In this section

- [Accounts in different currencies](/docs/user-guide/multi-currency/#accounts-in-different-currencies)
- [Cross-currency transfers](/docs/user-guide/multi-currency/#cross-currency-transfers)
- [Currency in your budget](/docs/user-guide/multi-currency/#currency-in-your-budget)

**Note**
Which currencies are available, and how their exchange rates are kept up to
date, is configured by whoever runs your Econumo instance — see
[Multi-Currency Support](/docs/self-hosting/multi-currency/) in the
self-hosting docs.

---

## Accounts in different currencies

An account's currency is chosen when you
[create it](/docs/user-guide/accounts/#account-creation) and shown next to its
balance everywhere in the app. Every transaction on that account is entered in
the account's own currency — the Euro Cash account below is in EUR, so its
balance and all its transactions are in euros.

<ScreenshotSet>

</ScreenshotSet>

To spend from an account, add the transaction in that account's currency. To
move money between currencies, use a transfer.

---

## Cross-currency transfers

When you [transfer](/docs/user-guide/transactions/#adding-transfers) between two
accounts that use different currencies, Econumo shows **two amount fields** —
one for the source currency and one for the destination — so you can record
exactly what left one account and what arrived in the other. This keeps both
balances correct regardless of the rate your bank used.

<ScreenshotSet>

</ScreenshotSet>

In the Euro Cash account above, the "Transfer from John's Card" line is the
euro side of one such transfer — dollars left the card, euros arrived in the
cash account.

---

## Currency in your budget

A budget is kept in a single base currency, but individual elements
(categories, tags, envelopes) can be budgeted in their own currency. Open an
element's menu in **Edit structure** mode and choose **Change currency**:

<ScreenshotSet>

</ScreenshotSet>

Spending in a foreign currency is converted to the budget's currency for folder
and budget totals. When your accounts span several currencies, the budget header
shows a per-currency switcher (the `$` / `€` toggle); select a currency to see
its spending progress and the average exchange rate used for the period:

<ScreenshotSet>

</ScreenshotSet>

**Note**
Conversions use the exchange rates loaded into your Econumo instance. If rates
look off, ask your administrator to refresh them (see
[Multi-Currency Support](/docs/self-hosting/multi-currency/)).
