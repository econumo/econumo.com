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
- [Sign-in methods](/docs/user-guide/user-profile/#sign-in-methods)
- [Sessions](/docs/user-guide/user-profile/#sessions)
- [API tokens](/docs/user-guide/user-profile/#api-tokens)
- [Connected apps](/docs/user-guide/user-profile/#connected-apps)
- [Privacy](/docs/user-guide/user-profile/#privacy)

---
## Accessing your user profile

Open **Settings** and select the card with your name at the top of it — it is
labelled **Personal settings**, and so is the page it opens. The page shows
your personal details, preferences, security and privacy settings. To sign
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

---
## Privacy

The **Privacy** section, below Security, holds a single switch: **Share usage
statistics**.

<ScreenshotSet>

</ScreenshotSet>

Sharing is on by default. Switching it off stops Econumo from sending
in-app usage events right away — no page reload needed, and the setting
follows your account across devices.

**Note**
Turning usage sharing off never touches your budgets, transactions, or any
other data in your account. Financial data and personal information such as
your name or email are never sent either way, whichever way the switch is
set.
