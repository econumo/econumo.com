URL: https://econumo.com/docs/comparison/econumo-vs-firefly-iii/

# Econumo vs Firefly III

Firefly III is the most established self-hosted personal finance manager there is —
in development since 2012, with 24,000 GitHub stars and 27 million Docker pulls.
If you have searched for self-hosted finance software, you have met it.

It is also, by its author's own description, **a double-entry bookkeeping system
rather than a budgeting app** — and it is **strictly single-user**. Those two facts
decide most comparisons with Econumo.

**The short version**

Choose **Firefly III** if you want a mature, deeply featured transaction manager
with double-entry rigour, rich reporting and a huge community — and you are the
only person who will use it.
Choose **Econumo** if you want **envelope budgeting** rather than spending caps, or
if you want to **share a budget with your partner without sharing a password**.
Firefly III's own FAQ recommends password-sharing for couples; Econumo has proper
per-user sharing.

---

## At a glance

| | Econumo | Firefly III |
|---|---|---|
| **Licence** | MIT | AGPL-3.0-or-later |
| **Price** | Free self-hosted; $20 one-time cloud | Free, self-host only |
| **GitHub stars** | 79 | 24,070 |
| **Forks** | 2 | 2,229 |
| **Contributors** | small core team | 177 (89% of commits by one person) |
| **Container pulls** | ~21,000 across two registries | 27.5 million (Docker Hub) |
| **Releases to date** | 24 | 329 |
| **In development since** | 2020 | 2012 |
| **First public release** | November 2024 | October 2014 |
| **Latest release** | v1.1.1 (19 Jul 2026) | v6.6.6 (1 Jul 2026) |
| **Cadence** | Feature-driven | ~45 releases in the last 12 months |
| **Stack** | Go, single binary | PHP ≥ 8.5, Laravel 13 |
| **Database** | SQLite or PostgreSQL | MySQL, MariaDB, PostgreSQL, SQLite |
| **Memory footprint** | ~10 MB | Full PHP/web-server stack |
| **Budgeting model** | Envelope | Spending caps on a double-entry ledger |
| **Zero-based budgeting** | ✅ | ❌ Explicitly declined |
| **Household sharing** | ✅ Per-item access levels | ❌ "Share the username and password" |
| **Multi-currency** | ✅ Converts into one budget currency | ⚠️ Yes, but budgets ignore foreign amounts |
| **Bank sync** | ❌ CSV import | ⚠️ Separate app; EU providers contracting |
| **Mobile** | PWA | ❌ No official app; community apps only |
| **API** | ✅ REST + Swagger | ✅ Extensive REST + webhooks |

*Figures observed 18 July 2026 from the GitHub API, Docker Hub and Firefly III's
official documentation.*

---

## Licence — the one real legal difference

Econumo is **MIT**. Firefly III is **AGPL-3.0-or-later**.

The AGPL is the strongest common copyleft licence: if you modify Firefly III and
let others use it **over a network**, you must publish your modifications. For a
household running it privately this changes nothing. For anyone building a service
on top, it is a serious constraint that MIT does not impose.

---

## Price

Both are free to self-host. Firefly III has **no official paid tier and no
official hosted service** — self-hosting is the only supported model. It is funded
through GitHub Sponsors, Patreon, Ko-fi and Liberapay, and the author describes it
plainly as *"a side gig."*

Econumo's self-hosted edition is likewise free, with an optional hosted account at
**$20 one-time per user** for those who would rather not run a server. Firefly III
has no equivalent — third-party hosts list it, but that is not a project offering.

---

## Popularity and project health

Firefly III is far more established, and the numbers are not close.

| | Econumo | Firefly III |
|---|---|---|
| GitHub stars | 79 | **24,070** |
| Forks | 2 | **2,229** |
| Container pulls | ~21,000 across two registries | **27.5 million** (Docker Hub) |
| In development since | 2020 | **2012** |
| Releases | 24 | **329** |

If longevity and community size are what you are optimising for, Firefly III wins
comfortably.

One thing to weigh alongside that, in fairness to both projects: Firefly III's
development is **overwhelmingly one person**. James Cole has authored roughly
20,800 of the repository's commits — about 89% — and the next most active human
contributor has 131. Of the last 100 commits, 68 were his, 31 were bots, and one
was from anyone else. The project is very actively maintained and ships roughly
every eight days, but its bus factor is 1, and the author is candid that it is a
side project.

That is not a criticism so much as context: a large star count does not
automatically mean a large maintenance team.

---

## Release history

Firefly III has one of the most prolific release records in the category: **329
releases since October 2014**, averaging around 28 stable releases a year over its
lifetime and accelerating to **45 in the last twelve months** — roughly one every
eight days.

| | Econumo | Firefly III |
|---|---|---|
| Total releases | 24 | 329 |
| First public release | 16 Nov 2024 | 14 Oct 2014 |
| Latest release | v1.1.1, 19 Jul 2026 | v6.6.6, 1 Jul 2026 |

The flip side of that cadence is an upgrade treadmill. Firefly III moved from PHP
8.3 to **PHP 8.5** within about eighteen months, dropped Docker support for
`linux/arm/v7`, `linux/arm/v8` and `linux/386` in 6.2.0, and has renamed core
concepts across recent versions. Its own 6.2.0 release note says: *"I expect you
will run into issue, and I appreciate your feedback and your patience as I fix
them."*

---

## Budgeting — the philosophical difference

This is the most important section on the page, and it is not a matter of one
being more polished than the other. **They disagree about what budgeting is.**

**Firefly III does not do envelope or zero-based budgeting, by design.** A budget
there is, in the docs' own words, *"just another identifier to link withdrawals
together"*, optionally with a date range and an amount — a **spending cap**, not an
envelope you fund.

The clearest proof is this line from the
[budgets documentation](https://docs.firefly-iii.org/explanation/financial-concepts/budgets/):

> "You cannot assign income to a budget to automatically increase the budgets
> amount. If you have more money available for the budget, you must increase the
> budget manually."

That is the exact inverse of envelope budgeting, where income is what fills the
envelopes. Overspending is also not enforced — the budget simply depletes and
*"Firefly III will not complain."* Rollover exists only as a cron-driven
"auto-budget" mode, not as native carryover.

The maintainer has stated his position directly, on a page flagged as personal
opinion:

> "Zero based budgeting is a method of budgeting that focuses on giving each Euro
> a goal. … I believe this approach is pretty terrible."

So this will not change. If you have come from YNAB and want that workflow,
Firefly III is explicitly not offering it.

**Econumo is envelope-first.** [Budgets](/docs/user-guide/budgets/) are the primary
object: income is assigned to envelopes grouped in folders, with limits, available
amounts and rollover.

*Econumo's envelope budget: money assigned into envelopes, not spending caps
attached to a ledger.*

Neither model is wrong. But they suit different people, and the choice between
them is the choice between these two apps.

---

## Household sharing — Firefly III's hardest limit

Firefly III supports unlimited **users**, each with a completely separate financial
administration. What it does not support is two people sharing one.

From the [official multi-user documentation](https://docs.firefly-iii.org/how-to/firefly-iii/features/multi-user/):

> "Can I share my administration with other users? At the moment, you cannot.
> Sorry about that. … This is a big project and will take a while."

And from the [FAQ](https://docs.firefly-iii.org/references/faq/firefly-iii/general/):

> "Each administration is tightly locked to a single user. If you want to share
> your financial administration with your partner or somebody else, **you must
> share the username and password with them.**"

The author has explained why it is unlikely to change soon: roughly 95% of the
codebase would be affected, since every query is scoped to a single user ID. Asked
in 2021 whether household use really required sharing credentials, his answer was
*"Indeed. I advise a password manager with a shared vault."* The request dates back
to 2016 and still ships as "at the moment, you cannot" as of July 2026.

**Econumo was built for this case.** You
[connect by invitation](/docs/user-guide/shared-access/) and set an access level
**per account and per budget**. Each person has their own login, their own
password, and sees exactly what you have shared.

For a couple or a family, this is the single biggest practical difference between
the two applications.

---

## Multi-currency — both support it, differently

Firefly III's multi-currency support is genuinely substantial: unlimited
currencies, a currency per asset account, and mandatory foreign amounts on
cross-currency transactions. Automatic exchange rates arrived in **v6.2.0**
(January 2025).

There are real caveats worth knowing before relying on it:

- Exchange rates are **off by default** and need a working cron job
- Conversion runs **one way only**, into your primary currency
- If a rate is missing, Firefly III **silently uses 1**
- No historical rates
- Maximum 8 decimal places, so most cryptocurrencies are impractical
- **Budgets ignore foreign amounts entirely** — per the docs, *"A budget with the
  amount set to EUR 100 will not be influenced by transactions in USD, even when
  those transactions are linked to the budget."* You must set a separate budget
  amount per currency.

That last point matters most here: Firefly III is multi-currency at the *ledger*
level, but its *budgets* are not.

**Econumo converts everything into a single budget currency**, so a multi-currency
household sees one set of totals that reconcile — see
[Multi-Currency](/docs/user-guide/multi-currency/). Firefly III's ledger is the
more powerful accounting tool; Econumo's budget is the more usable multi-currency
budget.

---

## Bank import

Neither project is in a strong position here, but for different reasons.

**Firefly III** imports through the **Data Importer, a completely separate
application** with its own installation, Docker image, upgrade cycle and OAuth
wiring. It reads CSV and CAMT.053 files, and connects to Enable Banking (2,500+
banks across 29 European countries), SimpleFIN and Lunch Flow (paid).

Two of its longest-standing providers are going away: **Salt Edge ended free-tier
access for Firefly III users on 31 October 2025**, and **GoCardless is shifting
away from its bank-account-data product**. European bank sync is mid-migration to
Enable Banking.

The docs are candid about the experience — *"Importing data from your bank and
doing this automatically is not that easy with Firefly III"* — and note that
imported transactions probably will not match ones you entered manually. Docker
pull counts suggest many users skip the importer entirely: 12.3M pulls against
27.5M for the core image.

**Econumo** has no automatic bank import at all — a
[deliberate decision](/docs/faq/) — with
[CSV import/export](/docs/user-guide/csv-import-export/) and a
[REST API](/docs/api/) instead.

So: Firefly III can sync from banks and Econumo cannot, but Firefly III's bank sync
costs you a second application to run and is contracting in Europe.

---

## Setup and running cost

| | Econumo | Firefly III |
|---|---|---|
| Runtime | Single Go binary, distroless image | PHP ≥ 8.5 + web server |
| Extensions needed | none | BCMath, intl, curl, zip, libsodium, GD, XML, MBString, DB driver |
| Post-install steps | migrations run on boot | four `php artisan` commands |
| Cron job | not required | effectively required |
| Import tooling | built in | separate application |
| Memory | ~10 MB | full PHP stack |

Firefly III's own documentation states it is *"geared towards tech-savvy users"*
and that you should be someone who *"doesn't mind tinkering with self-hosted
servers."* That is an accurate and honest self-description.

Econumo pulls one image, runs its migrations on boot and uses about 10 MB of RAM.

---

## Mobile

**Firefly III has never shipped an official mobile app.** Its documentation lists
community apps — Waterfly III (Android), Abacus (iOS and Android), Photuris III,
Firefly-Pico and others — several actively maintained, one officially flagged as
dead since January 2020. The project positions its REST API as the mobile story.

**Econumo** is a responsive web app installable to the home screen on
[iPhone, Android, Mac and PC](/docs/apps/).

---

## Where Firefly III is better

- **Maturity** — fourteen years of development, 329 releases, 27.5M Docker pulls
- **Double-entry rigour** — a real accounting ledger, which Econumo is not
- **Reporting depth** — far more extensive
- **Bank sync** — Econumo has none at all
- **Import formats** and a large third-party ecosystem
- **API surface** — extremely broad, plus first-class webhooks
- **Community** — vastly larger, with abundant third-party guides

## Where Econumo is better

- **Envelope budgeting** — Firefly III declines to offer it
- **Household sharing** — proper per-user access instead of a shared password
- **Multi-currency budgeting** — budgets that actually combine currencies
- **Setup** — one small binary versus a PHP stack, cron job and second app
- **Licence** — MIT rather than AGPL
- **Hosted option** — $20 one-time, or self-host free

---

## Which should you choose?

**Choose Firefly III if:**

- You want a full double-entry ledger and detailed financial reporting
- You are budgeting alone and will never need to share
- You want spending caps rather than funded envelopes
- You want bank sync and are willing to run a second application for it
- You are comfortable maintaining a PHP application
- Project maturity and ecosystem size are decisive

**Choose Econumo if:**

- You want **envelope budgeting**
- You want to **share a budget with your household**, each person with their own login
- You want **multi-currency budgets** that combine into one set of totals
- You want a small, simple deployment
- You want the option of a hosted account for a single $20 payment

Try the [Econumo demo](https://demo.econumo.com) or the
[Firefly III demo](https://demo.firefly-iii.org) — both run in a browser.

---

## Frequently asked questions

### Can my partner and I share a budget in Firefly III?

No. Each administration is locked to one user, and the official FAQ says you must
share the username and password. Econumo has invitation-based sharing with
per-account and per-budget access levels.

### Does Firefly III do envelope or zero-based budgeting?

No. Budgets are spending caps on a double-entry ledger; you cannot assign income to
a budget. The maintainer has written that he considers zero-based budgeting a poor
approach and will not add it.

### Is Firefly III free?

Yes — AGPL-3.0-or-later, self-hosted only, funded by sponsorship. There is no
official hosted tier.

### Does Firefly III support multiple currencies?

Yes at the ledger level, with caveats: rates are off by default, convert only into
your primary currency, and fall back to 1 when missing. Budgets ignore foreign
amounts entirely.

### Which is easier to set up?

Econumo — a single Go binary using about 10 MB of RAM. Firefly III needs PHP 8.5
with nine extensions, a database, four post-install commands, a cron job, and a
second application for imports.

---

*Last verified 18–19 July 2026 against the GitHub API, Docker Hub and Firefly III's
official documentation. If you spot something out of date,
[let us know](/docs/contact-us/).*
