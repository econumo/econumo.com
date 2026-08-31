URL: https://econumo.com/docs/user-guide/

# User Guide

This guide covers the essentials of using Econumo — from your first sign-in to
family budgeting with shared accounts.

Econumo works the same way in a desktop browser, on a tablet, and on a phone.
Throughout this guide, every screen is shown on all three form factors: the
desktop layout with the sidebar, the compact tablet layout, and the mobile
layout, where lists open full-screen and actions live in bottom sheets.

## Contents

- [Introduction](/docs/user-guide/)
  - [Sign Up](/docs/user-guide/#sign-up)
  - [Sign In](/docs/user-guide/#sign-in)
  - [Password Recovery](/docs/user-guide/#password-recovery)
  - [Getting started checklist](/docs/user-guide/#getting-started-checklist)
  - [Finding your way around](/docs/user-guide/#finding-your-way-around)
- [Accounts](/docs/user-guide/accounts/)
  - [Account creation](/docs/user-guide/accounts/#account-creation)
  - [Managing your accounts](/docs/user-guide/accounts/#managing-your-accounts)
  - [Shared access](/docs/user-guide/accounts/#shared-access)
- [Transactions](/docs/user-guide/transactions/)
  - [Adding transactions](/docs/user-guide/transactions/#adding-transactions)
  - [Editing a transaction](/docs/user-guide/transactions/#editing-a-transaction)
  - [Deleting a transaction](/docs/user-guide/transactions/#deleting-a-transaction)
- [Recurring Transactions](/docs/user-guide/recurring-transactions/)
  - [Creating a recurring transaction](/docs/user-guide/recurring-transactions/#creating-a-recurring-transaction)
  - [Posting or skipping a payment](/docs/user-guide/recurring-transactions/#posting-or-skipping-a-payment)
  - [Editing and deleting a schedule](/docs/user-guide/recurring-transactions/#editing-and-deleting-a-schedule)
- [Classifications](/docs/user-guide/classifications/)
  - [Create a category, tag, or payee](/docs/user-guide/classifications/#create-a-category-tag-or-payee)
  - [Budget tags and reporting tags](/docs/user-guide/classifications/#budget-tags-and-reporting-tags)
  - [Update or delete](/docs/user-guide/classifications/#update-or-delete)
  - [Merge duplicates](/docs/user-guide/classifications/#merge-duplicates)
  - [Archive or unarchive](/docs/user-guide/classifications/#archive-or-unarchive)
  - [Searching a long list](/docs/user-guide/classifications/#searching-a-long-list)
- [Budgets](/docs/user-guide/budgets/)
  - [Budget creation](/docs/user-guide/budgets/#budget-creation)
  - [Update budget details](/docs/user-guide/budgets/#update-budget-details)
  - [Manage your budget](/docs/user-guide/budgets/#manage-your-budget)
  - [Budgets list](/docs/user-guide/budgets/#budgets-list)
  - [Completing, duplicating and archiving a budget](/docs/user-guide/budgets/#completing-duplicating-and-archiving-a-budget)
  - [Shared access](/docs/user-guide/budgets/#shared-access)
- [Plan](/docs/user-guide/plan/)
  - [Opening the Plan view](/docs/user-guide/plan/#opening-the-plan-view)
  - [Reading the sheet](/docs/user-guide/plan/#reading-the-sheet)
  - [Planning a month](/docs/user-guide/plan/#planning-a-month)
  - [The Balance row](/docs/user-guide/plan/#the-balance-row)
  - [Keeping a long sheet readable](/docs/user-guide/plan/#keeping-a-long-sheet-readable)
- [Shared access](/docs/user-guide/shared-access/)
  - [Connect with another user](/docs/user-guide/shared-access/#connect-with-another-user)
  - [Accept or decline a sharing request](/docs/user-guide/shared-access/#accept-or-decline-a-sharing-request)
  - [Remove connection between users](/docs/user-guide/shared-access/#remove-connection-between-users)
  - [Check shared accounts and budgets](/docs/user-guide/shared-access/#check-shared-accounts-and-budgets)
  - [Access status](/docs/user-guide/shared-access/#access-status)
- [Multi-Currency](/docs/user-guide/multi-currency/)
  - [Accounts in different currencies](/docs/user-guide/multi-currency/#accounts-in-different-currencies)
  - [Cross-currency transfers](/docs/user-guide/multi-currency/#cross-currency-transfers)
  - [Currency in your budget](/docs/user-guide/multi-currency/#currency-in-your-budget)
- [Currencies](/docs/user-guide/currencies/)
  - [Choosing which currencies you see](/docs/user-guide/currencies/#choosing-which-currencies-you-see)
  - [Adding your own currency](/docs/user-guide/currencies/#adding-your-own-currency)
  - [Editing or deleting a custom currency](/docs/user-guide/currencies/#editing-or-deleting-a-custom-currency)
- [User profile](/docs/user-guide/user-profile/)
  - [Updating your user profile](/docs/user-guide/user-profile/#updating-your-user-profile)
  - [Sessions](/docs/user-guide/user-profile/#sessions)
  - [API tokens](/docs/user-guide/user-profile/#api-tokens)
- [CSV Import & Export](/docs/user-guide/csv-import-export/)

---
## Sign Up

### Econumo (cloud)

Registration requires a one-time payment. Click **Sign up**, complete the
payment, and you will receive an email with your credentials.

<ScreenshotSet>

</ScreenshotSet>

### Econumo (self-hosted)

To create an account in self-hosted Econumo, switch to the **Sign up** tab and
provide your name (or nickname), email, and password (entered twice to
confirm).

<ScreenshotSet>

</ScreenshotSet>

**Note**
Self-hosted administrators can disable open registration with the
`ECONUMO_ALLOW_REGISTRATION` environment variable and create users from the
[CLI](/docs/self-hosting/cli-commands/) instead.

---
## Sign In

To sign in, enter the credentials you provided (or received for Econumo Cloud)
during sign-up.

<ScreenshotSet>

</ScreenshotSet>

---
## Password Recovery

Click **Forgot password?** on the sign-in screen, enter your email, and press
**Send code**.

<ScreenshotSet>

</ScreenshotSet>

If an account exists with the provided email, you will receive a security code.
Enter the code, choose a new password, and press **Reset password**:

<ScreenshotSet>

</ScreenshotSet>

---
## Getting started checklist

After your first sign-in, Econumo greets you with the **Getting started**
checklist — a guided tour through the initial setup: add your accounts, enter
(or import) your first transaction, review categories, tags, and payees, pick
an avatar, connect with your partner, and create your budget. Each step links
to the matching section of this guide, and completed steps are ticked off
automatically.

<ScreenshotSet>

</ScreenshotSet>

Work through the steps in any order — the shortcut buttons (**Add account**,
**Import transactions**, **Choose your avatar**) open the same dialogs
described later in this guide. When you are done, press **Finish setup** at
the bottom of the list. Nothing is lost by finishing early: every step remains
available in **Settings**.

---
## Finding your way around

Your accounts, grouped into folders, fill the sidebar on desktop and tablet and
the home screen on mobile; **Budget & Plan** above them opens your
[budget](/docs/user-guide/budgets/) and its
[Plan view](/docs/user-guide/plan/).

Everything that is not day-to-day spending lives in **Settings**, in three
groups:

- **Finances** — [Accounts](/docs/user-guide/accounts/),
  [Shared access](/docs/user-guide/shared-access/), **Budgets & Plans**, and
  [Recurring transactions](/docs/user-guide/recurring-transactions/).
- **Classification** — [Categories, Tags, Payees](/docs/user-guide/classifications/)
  and [Currencies](/docs/user-guide/currencies/).
- **Data** — [Import and Export CSV](/docs/user-guide/csv-import-export/).

On desktop and tablet, open Settings from the bottom of the sidebar; on mobile,
from the bottom of the home screen. Your name at the top of the screen opens
your [profile](/docs/user-guide/user-profile/), and the **API** link at the
very bottom opens the [API reference](/docs/api/) for your instance.

<ScreenshotSet>

</ScreenshotSet>
