URL: https://econumo.com/docs/self-hosting/single-sign-on/

# Single sign-on

Econumo can add **Sign in with Google**, **Sign in with Apple** and a button
for your own OpenID Connect provider (Authentik, Keycloak, Zitadel, Okta,
Cloudflare Access, …) to the sign-in and sign-up pages. Buttons can sit next
to email and password, or replace them.

Each provider is an optional slot, configured only through environment
variables. You can enable all three at once. Most self-hosted instances enable
one.

## In this section

- [Before you start](/docs/self-hosting/single-sign-on/#before-you-start)
- [Your own OpenID Connect provider](/docs/self-hosting/single-sign-on/#your-own-openid-connect-provider)
- [Google](/docs/self-hosting/single-sign-on/#google)
- [Apple](/docs/self-hosting/single-sign-on/#apple)
- [Provider-only sign-in](/docs/self-hosting/single-sign-on/#provider-only-sign-in)
- [How accounts are matched](/docs/self-hosting/single-sign-on/#how-accounts-are-matched)

---
## Before you start

Every slot needs `ECONUMO_URL`, the public URL of your instance:

```dotenv
ECONUMO_URL=https://money.example.com
```

You never configure the callback URL. Econumo builds it from `ECONUMO_URL`, and
it is the one value you register with the provider:

```
<ECONUMO_URL>/api/v1/oauth/callback-<google|apple|oidc>
```

A slot is all-or-nothing. If you set some of its variables but not all, the
server refuses to start and names the one that is missing.

---
## Your own OpenID Connect provider

This slot works with any standards-compliant OpenID Connect provider. Here is
the setup in [Authentik](https://goauthentik.io/). Other providers follow the
same steps:

1. Create an **OAuth2/OpenID Provider** (**Applications → Providers →
   Create**).
2. Set **Redirect URIs** to `<ECONUMO_URL>/api/v1/oauth/callback-oidc`.
3. Under **Advanced protocol settings**, pick an RSA **Signing Key**. Econumo
   accepts ID tokens signed with RS256 or ES256.
4. Note the **Client ID**, **Client Secret** and **OpenID Configuration URL**.
   The issuer URL is that address without the trailing
   `/.well-known/openid-configuration`.
5. Create an **Application** and attach it to the provider.
6. Optional: to have signing out of Econumo also sign the user out of
   Authentik (web only), add `<ECONUMO_URL>/login` as a post-logout redirect
   URI on the provider.
7. Configure Econumo:

```dotenv
ECONUMO_OIDC_ISSUER_URL=https://auth.example.com/application/o/econumo/
ECONUMO_OIDC_CLIENT_ID=<client id>
ECONUMO_OIDC_CLIENT_SECRET=<client secret>
# the button label
ECONUMO_OIDC_NAME=Authentik
ECONUMO_OIDC_SCOPES=openid,profile,email
```

### Cloudflare Access

[Cloudflare Access for SaaS](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/saas-apps/generic-oidc-saas-app/)
can act as the OpenID Connect provider. Every identity provider and Access
group you have already connected to Access then becomes a way to sign in to
Econumo. In Zero Trust, go to **Access → Applications → Add an application →
SaaS**, choose **OIDC**, and set the redirect URL to the callback above. Then:

```dotenv
ECONUMO_OIDC_ISSUER_URL=https://<team>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>
ECONUMO_OIDC_CLIENT_ID=<client id>
ECONUMO_OIDC_CLIENT_SECRET=<client secret>
ECONUMO_OIDC_NAME=SSO
ECONUMO_OIDC_TRUST_EMAIL=true
```

**Unverified emails are rejected**
Econumo accepts a provider's email only when the ID token marks it as
verified (`email_verified`). Cloudflare Access never sends that claim. Without
`ECONUMO_OIDC_TRUST_EMAIL=true`, every sign-in fails with *"The sign-in
provider has not verified this email address."* Set it only for a provider
that already lets only verified identities through.

---
## Google

1. In the [Google Cloud console](https://console.cloud.google.com/), open
   **APIs & Services → Credentials**. If you are asked to, configure the
   **OAuth consent screen** first. The External user type is fine. While the
   app stays in Testing mode, add yourself as a test user.
2. **Create Credentials → OAuth client ID**, type **Web application**.
3. Under **Authorized redirect URIs**, add
   `<ECONUMO_URL>/api/v1/oauth/callback-google`.
4. Copy the client ID and secret:

```dotenv
ECONUMO_OAUTH_GOOGLE_CLIENT_ID=<client id>
ECONUMO_OAUTH_GOOGLE_CLIENT_SECRET=<client secret>
```

---
## Apple

Sign in with Apple needs a paid Apple Developer account.

1. In the [developer portal](https://developer.apple.com/account/resources/identifiers/list),
   note your **Team ID**.
2. Register an **App ID** with the **Sign in with Apple** capability.
3. Register a **Services ID**, e.g. `com.example.econumo.signin`. This is
   your client ID.
4. Edit the Services ID and enable **Sign in with Apple**. Associate it with
   the App ID, and set the **Return URL** to
   `<ECONUMO_URL>/api/v1/oauth/callback-apple`.
5. Under **Keys**, create a key with **Sign in with Apple** enabled and
   download the `.p8` file. You can download it only once. Note its **Key ID**.
6. Make the `.p8` file readable by the server, but only by the server. In
   Docker, mount it into the container, e.g.
   `./secrets/apple.p8:/etc/econumo/apple.p8:ro`, and point the variable at
   the path inside the container:

```dotenv
ECONUMO_OAUTH_APPLE_CLIENT_ID=com.example.econumo.signin
ECONUMO_OAUTH_APPLE_TEAM_ID=<team id>
ECONUMO_OAUTH_APPLE_KEY_ID=<key id>
ECONUMO_OAUTH_APPLE_PRIVATE_KEY_FILE=/etc/econumo/apple.p8
```

Keep the `.p8` file exactly as Apple produced it. The older
`ECONUMO_OAUTH_APPLE_PRIVATE_KEY` variable, which took the key inline, is no
longer accepted: a server that still sets it refuses to start.

---
## Provider-only sign-in

Set `ECONUMO_PASSWORD_LOGIN=false` to turn email and password off. The sign-in
page then shows only the provider buttons. Password sign-in, sign-up, reset
and change are all refused. Existing sessions and
[API tokens](/docs/user-guide/user-profile/#api-tokens) keep working. The
server does not start in this mode unless at least one provider is
configured.

`ECONUMO_ALLOW_REGISTRATION` then applies to providers alone. With `true`,
anyone who can sign in at your provider gets an account on their first
sign-in, so you manage users in the identity provider. With `false`, only
existing accounts can sign in.

**Link providers before you turn passwords off**
Econumo never links a provider to an account that has a password on its own,
and once passwords are off that account can no longer sign in to link one.
Before you switch, have every existing user sign in with their password and
link the provider under
[Sign-in methods](/docs/user-guide/user-profile/#sign-in-methods). Users
created with `user:create` always have a password, so this applies to them too.

---
## How accounts are matched

- **First sign-in, no matching account.** Econumo creates a new account
  without a password, if registration is allowed. The user can add a password
  later.
- **Same email as an account without a password.** The provider is linked
  automatically, and the account owner gets an email about it.
- **Same email as an account with a password.** The sign-in is refused. The
  user signs in with their password once, or resets it, and links the provider
  from Settings. Econumo does not merge a provider into an account whose owner
  has not signed in, because a password account is no proof that its holder
  owns the address.
- **A password reset reclaims the account.** It signs out every session,
  revokes API tokens, and unlinks every provider that reports a *different*
  email address.
- **Changing `ECONUMO_OIDC_ISSUER_URL` later** makes every user's old link
  stale. Accounts without a password are matched again by their verified
  email on their next sign-in. Accounts with a password are refused, as
  above: their owners sign in with the password and link the provider again.
  With `ECONUMO_PASSWORD_LOGIN=false` this locks them out, so turn password
  sign-in back on while they re-link.

The full reference, with more edge cases, is
[`docs/oidc-setup.md`](https://github.com/econumo/econumo/blob/main/docs/oidc-setup.md)
in the repository.
