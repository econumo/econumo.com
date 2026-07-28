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
- [Sessions](/docs/user-guide/user-profile/#sessions)
- [API tokens](/docs/user-guide/user-profile/#api-tokens)

---
## Accessing your user profile

Click on your avatar in the left sidebar (or open **Settings** and tap your
name there). The profile screen shows your personal details, preferences, and
security settings, and is also where you **log out**:

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

### How to change your default currency

The **Currency** preference in the Preferences section sets your default
currency in Econumo.

### How to change the interface language

The **Language** preference sits right below **Currency**. Open it and pick one
of the available languages — currently **English** and **Русский**. The same
dialog is available from the language badge on the sign-in and sign-up screens,
before you have an account.

<ScreenshotSet>

</ScreenshotSet>

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

The same tokens also authenticate Econumo's built-in MCP server, so an
MCP-compatible AI assistant (Claude Code, Claude Desktop, Cursor) can list
your accounts and log transactions on your behalf — see the
[v1.2.0 release notes](/releases/v1.2.0/#talk-to-your-finances-from-an-ai-assistant)
for the client setup steps.
