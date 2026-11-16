URL: https://econumo.com/docs/user-guide/user-profile/

# User profile

This section provides an overview of user profiles in Econumo.

## In this section

- [Accessing your user profile](/docs/user-guide/user-profile/#accessing-your-user-profile)
- [Updating your user profile](/docs/user-guide/user-profile/#updating-your-user-profile)
  - [How to change your name](/docs/user-guide/user-profile/#how-to-change-your-name)
  - [How to change your email](/docs/user-guide/user-profile/#how-to-change-your-email)
  - [How to change your avatar](/docs/user-guide/user-profile/#how-to-change-your-avatar)
  - [How to change your password](/docs/user-guide/user-profile/#how-to-change-your-password)
  - [How to change your default currency](/docs/user-guide/user-profile/#how-to-change-your-default-currency)
  - [How to change the interface language](/docs/user-guide/user-profile/#how-to-change-the-interface-language)
  - [How to switch to dark mode](/docs/user-guide/user-profile/#how-to-switch-to-dark-mode)
- [Usage statistics and AI features](/docs/user-guide/user-profile/#usage-statistics-and-ai-features)
- [Sign-in methods](/docs/user-guide/user-profile/#sign-in-methods)
- [Sessions](/docs/user-guide/user-profile/#sessions)
- [App lock](/docs/user-guide/user-profile/#app-lock)
- [API tokens](/docs/user-guide/user-profile/#api-tokens)
- [Connected apps](/docs/user-guide/user-profile/#connected-apps)

---
## Accessing your user profile

Open **Settings** and select the card with your name at the top of it — it is
labelled **Personal settings**, and so is the page it opens. The page shows
your personal details, preferences and security settings. To sign
out, press **Log out**: it sits under that card on the Settings page and at the
top of Personal settings.

<ScreenshotSet>

</ScreenshotSet>

---
## Updating your user profile

### How to change your name

Type the new name in the "Name" field and tap outside it — the change is saved
automatically.

### How to change your email

Choose **Change email** in the Security section, enter your **New email** and
**Current password**, and press **Send confirmation code**. Econumo emails a
code to the new address to confirm you own it before the change takes effect;
your old address gets a notice, and every other session is signed out.

<ScreenshotSet>

</ScreenshotSet>

### How to change your avatar

Click your avatar on the profile screen to open the avatar picker. Choose a
color and an icon, then press **Save**. Your avatar is shown to everyone you
[share](/docs/user-guide/shared-access/) accounts and budgets with.

<ScreenshotSet>

</ScreenshotSet>

### How to change your password

Choose **Change password** in the Security section. Enter your current
password, then the new one twice:

<ScreenshotSet>

</ScreenshotSet>

**Note**
On a self-hosted instance with password sign-in turned off
(`ECONUMO_PASSWORD_LOGIN=false`), neither **Change password** nor **Set a
password** appears here — every sign-in goes through a linked provider
instead.

### How to change your default currency

The **Currency** preference in the Preferences section sets your default
currency in Econumo.

### How to change the interface language

The **Language** preference sits right below **Currency**. Open it and pick one
of the 11 available languages — English, Deutsch, Español, Français, Italiano,
Nederlands, Polski, Português, Русский, Українська, and 简体中文. The same
dialog is available from the language badge on the sign-in and sign-up screens,
before you have an account.

<ScreenshotSet>

</ScreenshotSet>

### How to switch to dark mode

**Theme**, under **Language**, switches Econumo between **Light** and **Dark**.
**System** follows your device's appearance. The theme applies only to the
device you set it on.

<ScreenshotSet>

</ScreenshotSet>

---
## Usage statistics and AI features

The last two Preferences each open a dialog with a single switch:

- **Usage statistics** → **Help improve Econumo**. Usage statistics show us
  which features are most popular and what to improve. Switching it off stops
  Econumo from sending in-app usage events right away, and the setting follows
  your account across devices.
- **AI features** → **Use AI features**. AI helps keep your finances organized
  — for example with [rule suggestions](/docs/user-guide/import-rules/#ai-rule-suggestions)
  for imported transactions. This preference appears only when your Econumo
  server has AI set up, and it is on by default. Turning it off stops
  everything that would send your data to the AI and removes your open
  suggestions.

<ScreenshotSet>

</ScreenshotSet>

**Note**
Neither switch touches your budgets, transactions, or any other data in your
account. Your financial data and personal information, such as your name or
email, are never included in usage statistics and never sent to the AI.

---
## Sign-in methods

**Security → Sign-in methods** lists the external accounts you can use to sign
in instead of a password — Google, Apple, or a custom OpenID Connect provider,
whichever your Econumo instance enables. Each provider your instance turns on
appears here with a **LINK** button.

<ScreenshotSet>

</ScreenshotSet>

Press **LINK** to connect a provider: Econumo hands you off to it to confirm
it's you, then brings you back with the provider listed as linked, its button
now reading **UNLINK**. From then on you can sign in either with your password
or with that provider.

**Note**
Unlinking is the same button in reverse. If a linked provider is the *only*
way into your account, Econumo won't let you remove the last one. For a
passwordless account, set a password first from **Change password**. On an
instance with password sign-in turned off, a stored password no longer counts
as a way in either, so the last remaining provider can't be unlinked at all —
the button is disabled with a note explaining why.

Linking or unlinking a provider emails you a notice, so gaining or losing a
way into your account never happens without you knowing.

---
## Sessions

**Security → Sessions** lists every device currently signed in to your account,
with the browser and operating system it was identified as and when it was last
active. Your current session is marked **Current**.

<ScreenshotSet>

</ScreenshotSet>

Press **Revoke** next to a session to sign that device out, **Sign out** to end
the session you are using right now, or **Sign out other devices** to end every
session except the current one.

**Note**
If you spot a session you do not recognise, revoke it and
[change your password](/docs/user-guide/user-profile/#how-to-change-your-password).

---
## App lock

**Security → App lock** asks for a PIN or a pattern whenever Econumo opens on
this device — useful on a shared tablet or a phone you hand to your kids.

1. Switch on **App lock**.
2. Choose **PIN** (4 to 8 digits) or **Pattern** (connect at least 4 dots),
   enter it, and enter it again to confirm.
3. Under **Lock after**, choose when Econumo locks once you leave it:
   **Immediately**, after **1 minute**, **5 minutes** or **15 minutes**.

**Change PIN or pattern** asks for the current one first.

<ScreenshotSet>

</ScreenshotSet>

**Note**
The lock protects Econumo on this device only, and it doesn't encrypt the data
stored on the device. If you forget the PIN or pattern, choose **Forgot PIN?**
(or **Forgot pattern?**) on the lock screen and log in again.

---
## API tokens

Econumo has a [REST API](/docs/api/), and personal access tokens are how you
authenticate against it — handy for scripts, home-automation dashboards, or any
integration of your own. Open **Security → API tokens** to manage them.

<ScreenshotSet>

</ScreenshotSet>

Press **Create token**, give it a name that will remind you what it is for
(for example, "Home Assistant"), and choose when it expires: **30 days**,
**90 days**, **365 days**, a **custom date**, or **never**.

<ScreenshotSet>

</ScreenshotSet>

**Note**
A personal access token grants full access to your account over the API — treat
it like a password. Create a separate token per integration so you can revoke
one without breaking the others.

The same tokens also authenticate Econumo's built-in MCP server. Claude and
Codex no longer need one — they sign in through the browser, see
[Connected apps](/docs/user-guide/user-profile/#connected-apps) — but a token
still works for any MCP client that can't.

---
## Connected apps

Econumo has a built-in MCP server, so an AI assistant such as Claude or Codex
can check your balances and budgets or log transactions for you, straight from
a chat. Connecting one takes only your Econumo address — there is no token to
create or paste.

Open **Security → Connected apps**. The page shows the address to use — for
Econumo, `https://app.econumo.com/mcp` — with a **Copy** button beside it:

<ScreenshotSet>

</ScreenshotSet>

1. In Claude (on the web, desktop or mobile), Claude Code or Codex, add a
   custom connector — an MCP server — with that address.
2. The app opens Econumo in your browser. Sign in if you are asked to.
3. Econumo asks you to **Allow** the app access to your account. An app you
   allow can read and change all of your Econumo data.

Every app you have allowed is listed on the same page, with when it was
connected and when it was last used. **Revoke** signs an app out right away.

**Note**
On a self-hosted server, connecting by address needs `ECONUMO_URL` set to the
server's public **https** address, with no path. Without it, Connected apps
reads *"Connecting AI apps isn't available on this server"* and the MCP server
accepts [API tokens](/docs/user-guide/user-profile/#api-tokens) only. Claude
on the web, desktop and mobile connects from Anthropic's servers, so for those
the server must be reachable from the internet; Claude Code and Codex only need
to reach it from your computer.
