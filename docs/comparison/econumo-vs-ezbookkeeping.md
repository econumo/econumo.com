URL: https://econumo.com/docs/comparison/econumo-vs-ezbookkeeping/

# Econumo vs ezBookkeeping

Of everything in the self-hosted personal finance space, **ezBookkeeping is
Econumo's closest technical twin.** Both are written in Go, both are MIT-licensed,
both ship as a lightweight self-hosted Docker container, both run on SQLite or
PostgreSQL, and both are built to run on hardware as small as a Raspberry Pi.

They are, however, built for two different jobs — and the difference is unusually
clean-cut.

**The short version**

ezBookkeeping is a **bookkeeping and analytics** tool: record what happened, import
it from almost any file format, and chart it. Econumo is a **budgeting** tool: plan
what should happen, in envelopes, together with your household.
ezBookkeeping has **no budgeting features at all** and **no shared household
ledger**. If you want either of those, that decides it. If you want the broadest
possible import-format support and rich retrospective analytics, ezBookkeeping is
excellent at that.

---

## At a glance

| | Econumo | ezBookkeeping |
|---|---|---|
| **Licence** | MIT | MIT |
| **Price** | Free self-hosted; $20 one-time cloud | Free, self-host only |
| **GitHub stars** | 79 | 5,239 |
| **Releases to date** | 24 | 22 |
| **In development since** | 2020 | October 2020 |
| **First public release** | November 2024 | June 2021 |
| **Latest release** | v1.1.1 (19 Jul 2026) | v1.5.1 (31 May 2026) |
| **Backend** | Go | Go |
| **Frontend** | React | Vue 3 (Framework7 mobile / Vuetify desktop) |
| **Database** | SQLite or PostgreSQL | SQLite, MySQL or PostgreSQL |
| **Memory footprint** | ~10 MB | ~30 MiB |
| **Envelope budgeting** | ✅ | ❌ Not supported at all |
| **Household sharing** | ✅ Per-item access levels | ❌ Multi-user, but no shared data |
| **Multi-currency** | ✅ | ✅ With auto-updating rates |
| **Import formats** | CSV | CSV, OFX, QFX, QIF, IIF, Camt.052/053, MT940 |
| **Bank sync** | ❌ | ❌ File import only |
| **Mobile** | PWA | PWA with separate mobile UI |
| **API** | ✅ OpenAPI / Swagger | ✅ HTTP API + MCP server |
| **2FA** | — | ✅ TOTP, WebAuthn, OIDC |

*Figures observed 18–19 July 2026 from the GitHub API and each project's official
documentation.*

---

## Licence and price

A genuine tie on licence: both are **MIT**, both are free to self-host forever.

The projects differ in how they sustain themselves. ezBookkeeping is unusually
absolutist — its FAQ states there are no paid features and that the project
**does not accept donations or sponsorships**, and there is no official hosted
service. Econumo funds development through an optional hosted cloud account
(**$20 one-time per user**, $40 for a family licence) while the self-hosted
edition stays free.

If you object on principle to a project having any commercial arm at all,
ezBookkeeping's position is the purer one. If you would rather pay once and not
run a server, only Econumo offers that.

---

## Popularity and project health

ezBookkeeping is much the better known of the two — **5,239 stars to Econumo's
79** — but the two projects are near-contemporaries. Both have been in development
since 2020; ezBookkeeping simply found its audience, and Econumo has not.

| | Econumo | ezBookkeeping |
|---|---|---|
| GitHub stars | 79 | **5,239** |
| Forks | 2 | 600 |
| Contributors | small core team | ~36 |
| In development since | 2020 | October 2020 |

One characteristic worth knowing about ezBookkeeping: development is
**overwhelmingly one person**, who personally answers nearly every issue. That
produces an unusually coherent product and fast, decisive issue triage — and it
also concentrates the project's bus factor. Design decisions are firmly held, and
requests that do not fit the vision are closed rather than left open, which is
directly relevant to the budgeting question below.

---

## Release history

Both projects started in 2020 and have shipped a near-identical number of public
releases, though Econumo spent its first four years closed-source.

| | Econumo | ezBookkeeping |
|---|---|---|
| In development since | 2020 | October 2020 |
| Public releases to date | 24 | 22 |
| First public release | v0.1.0, 16 Nov 2024 | v0.1.0, 20 Jun 2021 |
| 1.0 milestone | July 2026 (Go + React rewrite) | August 2025 |
| Latest release | v1.1.1, 19 Jul 2026 | v1.5.1, 31 May 2026 |

ezBookkeeping's cadence has accelerated sharply — 4 releases in 2023, 3 in 2024,
8 in 2025 and 6 in the first half of 2026. Both projects are healthy and actively
maintained.

---

## The two differences that decide it

### 1. ezBookkeeping has no budgeting

This is not a weak-budgeting story or a roadmap gap. ezBookkeeping does not
implement budgeting, by design.

The project's **own comparison page** lists budgeting as
[not supported](https://ezbookkeeping.mayswind.net/comparison/). There is no budget
entity in its data model. And budget feature requests —
[#67](https://github.com/mayswind/ezbookkeeping/issues/67),
[#127](https://github.com/mayswind/ezbookkeeping/issues/127),
[#168](https://github.com/mayswind/ezbookkeeping/issues/168) and
[#289](https://github.com/mayswind/ezbookkeeping/issues/289) — have been filed and
closed without implementation. Issue #289 puts the philosophy plainly: the app
focuses on tracking past transactions, with no support for planning or forecasting.

That is a legitimate product position. Plenty of people want a clean ledger with
good charts and no opinions about what they *should* spend. If that is you,
ezBookkeeping does it well.

But if you want to assign income to categories before you spend it — the envelope
method — ezBookkeeping cannot do it, and is not going to.
[Econumo's budgets](/docs/user-guide/budgets/) are the entire point of the app:
envelopes grouped into folders, with limits, available amounts and rollover.

*Econumo's budget view. ezBookkeeping has no equivalent screen.*

### 2. ezBookkeeping is multi-user, but not multi-player

This one is easy to get wrong, so it is worth stating precisely.

ezBookkeeping **does** support multiple users — one instance can host many
independent accounts. But each user's data is **completely separate**. There is no
shared ledger, no co-owned account, no household view and no cross-user
aggregation. The maintainer has explained the reasoning in
[#53](https://github.com/mayswind/ezbookkeeping/issues/53) and
[#322](https://github.com/mayswind/ezbookkeeping/issues/322): accounts, categories
and tags are all scoped to an individual user, ezBookkeeping is designed for
personal use, and cross-user aggregation is not planned.

For a couple who want a joint budget, the only workaround is sharing one login.

[Econumo's shared access](/docs/user-guide/shared-access/) is built for exactly
this case: you connect to another user by invitation, then set an access level
**per account and per budget**. Each person keeps their own login and sees a shared
view of the things you have chosen to share.

---

## Where ezBookkeeping is better

Being the closest twin cuts both ways. ezBookkeeping clearly beats Econumo on
several axes:

**Import formats.** ezBookkeeping reads CSV, OFX, QFX, QIF, IIF, Camt.052,
Camt.053 and MT940, plus dedicated migration importers for **GnuCash, Firefly III
and Beancount**. Econumo imports CSV only. If you are migrating years of history
out of another tool, this is a real gap.

**Authentication and security features.** TOTP two-factor authentication,
WebAuthn app lock, OIDC external authentication and login rate limiting all ship
today.

**AI and automation surface.** ezBookkeeping provides an HTTP API *and* an MCP
(Model Context Protocol) server, an Agent Skill and CLI tooling — ahead of most of
the field on AI integration. Econumo offers a documented
[REST API with Swagger UI](/docs/api/), but no MCP server.

**Extras.** Transaction image attachments with AI receipt recognition, scheduled
and recurring transactions, geolocation with maps, S3/MinIO attachment storage,
and a dedicated mobile UI distinct from the desktop one.

**Maturity.** Four more years of development and 66× the stars.

Neither app has automatic bank synchronisation — both are file-import and
manual-entry tools.

---

## Which should you choose?

**Choose ezBookkeeping if:**

- You want a ledger and analytics, not a budget
- You are migrating from GnuCash, Firefly III or Beancount and want an importer
- You need broad bank-statement format support (MT940, Camt.053, OFX, QIF)
- You want TOTP/WebAuthn/OIDC authentication out of the box
- You are budgeting alone and will never need to share
- Project maturity and community size are decisive

**Choose Econumo if:**

- You want **envelope budgeting** — ezBookkeeping has none
- You want a **shared household budget** where each person has their own login
- You want a hosted option you can pay for once instead of self-hosting
- You want the smallest possible footprint (~10 MB, single distroless binary)

Both are MIT-licensed, both export your data, and both have public demos — the
[Econumo demo](https://demo.econumo.com) and the
[ezBookkeeping demo](https://ezbookkeeping-demo.mayswind.net) — so you can try
both before committing.

---

## Frequently asked questions

### Does ezBookkeeping have budgeting?

No. Its own comparison page lists budgeting as unsupported, there is no budget
entity in the data model, and multiple budget requests have been closed without
implementation. It is a retrospective bookkeeping and analytics tool.

### Can a couple share a budget in ezBookkeeping?

No. Multiple users can have accounts on one instance, but their data is entirely
separate — no shared ledger and no cross-user aggregation, which the maintainer
has confirmed is not planned. Econumo supports per-account and per-budget sharing
by invitation.

### Is ezBookkeeping open source and free?

Yes — MIT-licensed with no paid features. The project does not accept donations or
sponsorships and offers no hosted service.

### Which uses fewer resources?

Both are very light. Econumo uses about 10 MB of RAM as a single distroless Go
binary; ezBookkeeping reports about 30 MiB for a single user.

---

*Last verified 19 July 2026 against the GitHub API and each project's official
documentation. If you spot something out of date,
[let us know](/docs/contact-us/).*
