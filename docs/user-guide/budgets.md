URL: https://econumo.com/docs/user-guide/budgets/

# Budgets

This section introduces the basics of 'Budgets' in Econumo.

Budgets enable you to implement a "Cash Stuffing" method, also known as the
envelope budgeting approach, which uses envelopes to manage spending.

The concept is straightforward: take a few envelopes, label each with an
expense category — such as groceries, rent, or car loan — and place the amount
of money you plan to spend in each envelope. This way, you set limits on your
spending for each category.

Econumo allows you to create virtual envelopes and allocate your funds
accordingly, so you can easily track how much money remains for each specific
category:

<ScreenshotSet>

</ScreenshotSet>

## In this section

- [Budget creation](/docs/user-guide/budgets/#budget-creation)
- [Update budget details](/docs/user-guide/budgets/#update-budget-details)
- [Manage your budget](/docs/user-guide/budgets/#manage-your-budget)
  - [Budgeting](/docs/user-guide/budgets/#budgeting)
  - [Organizing your budget](/docs/user-guide/budgets/#organizing-your-budget)
  - [Work with the budget](/docs/user-guide/budgets/#work-with-the-budget)
- [Budgets list](/docs/user-guide/budgets/#budgets-list)
- [Completing, duplicating and archiving a budget](/docs/user-guide/budgets/#completing-duplicating-and-archiving-a-budget)
- [Shared access](/docs/user-guide/budgets/#shared-access)

**Note**
To plan several months at once instead of one at a time, switch the budget to
its [Plan view](/docs/user-guide/plan/) — the same budget laid out as a
month-by-month sheet.

---

## Budget creation

Open **Settings → Budgets & Plans** and press **Create budget** (on mobile, the
**+** button in the header). Give the budget a name, pick its base currency,
and switch on the accounts that take part in it — the counter above the list
keeps track (*"3 of 5 included"*).

<ScreenshotSet>

</ScreenshotSet>

**Note**
Account membership is an explicit list, and a new budget starts with every
switch off — turn on the accounts you actually budget from, and leave out the
ones you don't, such as a long-term savings account. Budgets start from the
current month.

---
## Update budget details

Open your budget, press **Configure**, and choose **Budget details**. In the
dialog you can rename the budget, change its currency, and add or remove
accounts:

<ScreenshotSet>

</ScreenshotSet>

An account that already carries transactions in past months of this budget
cannot be removed from it — taking it out would rewrite months you have
already closed. The dialog says so under the list.

**Note**
On desktop and tablet, **Configure** sits in the top-right corner of the budget
page; on a phone it is the icon in the same corner. Besides **Budget details**
it holds **Edit structure**, **Open budget list**, and — on a phone and a
tablet — the **Budget** / **Plan** switch.

---
## Manage your budget

In your budget, you will work with the following entities:

- **Budget Folders** — to organize your spending conveniently (in the
  screenshots: _Essentials_, _Lifestyle_, _Vacations_).
- **Categories** — your Econumo categories.
- **Tags** — your budget [tags](/docs/user-guide/classifications/). These
  aggregate spending across categories (e.g. the whole _Italy 2026_ vacation).
  Reporting tags are not budgeted; they get
  [their own block](/docs/user-guide/budgets/#reporting-tags) at the foot of
  the page.
- **Envelopes** — these group several categories into one limit (e.g. an
  envelope for _Food_ could contain _Groceries_, _Drinks_, and _Restaurants_).

---
### Budgeting

The goal of budgeting is to maintain your monthly budget. Ideally, you should
prepare your budget before the month starts and make minor adjustments during
the month as needed. The months bar at the top switches between periods — on
desktop the **‹** and **›** arrows beside it step one month at a time — and the
budget shows how much money remains in your virtual envelopes. The bar is
clamped to the budget's own lifetime: an open budget runs well into the future,
while a
[completed one](/docs/user-guide/budgets/#completing-duplicating-and-archiving-a-budget)
stops just past its final month.

Each row has three columns:

1. **Budget** — the amount you plan to spend or save.
2. **Spent** — the amount you have actually spent.
3. **Available** — what is left: the budgeted amount plus anything carried
   over from previous months.

Click a number in the **Budget** column to adjust it — changes apply
instantly. Overspent elements are highlighted in red (like _Groceries_ in the
screenshots above).

If a [transaction has no category](/docs/user-guide/transactions/#adding-expenses),
its amount still counts: it appears at the bottom of the budget as a read-only
**Uncategorized** element — no **Budget** or **Available** figure, just the
**Spent** total — instead of being silently left out.

---
### Organizing your budget

The default structure of your budget may not be optimal. To change it, press
**Configure** and select **Edit structure**. In this mode you can create
folders and envelopes, drag elements between folders, and change element
currencies. Once you are finished, press **Done editing**.

<ScreenshotSet>

</ScreenshotSet>

**Folders.** Press **Create folder** to add one. The three-dots menu on a
folder lets you rename it (an empty folder can also be deleted there). Drag
folders and elements around using the dots handle. The built-in **Default
folder** is always last: it cannot be renamed or removed, and when it is empty
it just shows a hint inviting you to move elements into it.

**Envelopes.** To create an envelope, press the **+** button on the folder
header. Choose a name, currency, icon, and the categories you want to include:

<ScreenshotSet>

</ScreenshotSet>

Deleting an envelope releases its categories back into the budget.

**Element currency.** Each element can be budgeted in its own currency: open
the element's three-dots menu and choose **Change currency**. Amounts spent
and available for that element are converted automatically.

<ScreenshotSet>

</ScreenshotSet>

---
### Work with the budget

#### Tag and envelope breakdown

Tags and envelopes aggregate several categories. Expand one with the chevron
next to its name to see where the money actually went:

<ScreenshotSet>

</ScreenshotSet>

#### Spending details

To see the transactions behind any number, click the amount in the **Spent**
column:

<ScreenshotSet>

</ScreenshotSet>

#### Reporting tags

Below the folders — under the **Uncategorized** row — sits a separate
**Reporting tags** block. It totals what you spent per
[reporting tag](/docs/user-guide/classifications/#budget-tags-and-reporting-tags)
in the month: people, pets, places. Expand the block with the chevron beside
its title, and expand a single tag to see the categories behind its total.

<ScreenshotSet>

</ScreenshotSet>

These rows show a **Spent** figure only — no **Budget**, no **Available** — and
they sit outside the budget's totals. That is deliberate: a transaction can
carry several reporting tags at once, so its full amount counts under each of
them, and adding the block into the budget maths would count the same money
twice. Use it to answer "what did the dog cost us this month?", not "how much
is left to spend?".

#### Multi-currency budgets

If your accounts use several currencies, the budget header shows a per-currency
switcher (in the screenshots: `$` and `€`), and elements in foreign currencies
are converted to the budget's currency for folder totals. Select a currency in
the switcher to see its spending progress for the month and the average
exchange rate used for the period. See
[Multi-Currency](/docs/user-guide/multi-currency/) for the full picture.

---
## Budgets list

You can access your budgets list at **Settings → Budgets & Plans** or via
**Configure → Open budget list**. Shared budgets show the avatars of everyone
who uses them, and the bookmark icon marks your default budget — the one that
opens from **Budget & Plan** in the sidebar. Budgets you have archived collapse
into an **Archived (N)** group at the bottom of the list:

<ScreenshotSet>

</ScreenshotSet>

---
## Completing, duplicating and archiving a budget

A budget does not have to run forever. Every budget's three-dots menu in
**Settings → Budgets & Plans** carries its whole life cycle: **Open budget**,
**Access control**, **Duplicate…**, **Complete…**, **Archive**, and **Delete**.

<ScreenshotSet>

</ScreenshotSet>

### Complete a budget

**Complete…** closes a budget off at a chosen month. Pick the **Last month** it
covers; leave **Continue in a copy starting this month** on to name and start
its successor in the same step, with **Copy plans** deciding whether the
planned amounts come along. Turn that switch off and the **Copy plans** and
**Name** fields disappear — the budget is simply closed, with no successor.
Press **SAVE** and the budget is archived straight away: it leaves the active
list immediately and joins the **Archived** group below it.

<ScreenshotSet>

</ScreenshotSet>

### Duplicate a budget

**Duplicate…** copies a budget on its own, without closing the original: its
structure, folders, envelopes, member accounts and sharing all come across. The
copy is pre-named after the original with *"(copy)"* appended, keeps **Copy
plans** on, and can **Start from this month** instead of the original's first
month.

<ScreenshotSet>

</ScreenshotSet>

### Archive and unarchive

**Archive** files a budget away without completing it. An archived budget stays
in the list under **Archived (N)** and stays fully browsable — opening it shows
a banner reading *"This budget is archived and read-only"*, and its numbers
stay exactly as they were. Its menu offers **Unarchive** in place of
**Archive**, which brings it back to the active list.

---
## Shared access

To budget together with your partner, you first need to
[connect with them](/docs/user-guide/shared-access/). Then open the budgets
list, click the three dots on the budget you wish to share, and select
**Access control**. Pick the person and the access level:

<ScreenshotSet>

</ScreenshotSet>

Econumo supports the following access levels for budgets:

- **View only** — you share your budget only for viewing.
- **Manage budget** — you and your partner can collaboratively manage this
  budget and contribute to it together.
- **Full control** — like Manage budget, but your partner can also delete and
  rename the budget.

As with accounts, this sends a **pending invite** rather than sharing the
budget outright — your partner accepts or declines it from the
**Sharing requests** panel described in
[Shared Access](/docs/user-guide/shared-access/#accept-or-decline-a-sharing-request).
Once accepted, your partner sees the budget in their own budget list, and you
budget the same envelopes together — as John and Megan do with the "Family
budget" in the screenshots throughout this page.
