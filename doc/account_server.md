# The Account Server

The Account Server handles authentication, authorization and account management.

# Authentication
Most API calls require authentication using an access token.

Access tokens are only issued to valid accounts on registered clients. 

To get an access token, a user has four options:

- login using a registered email address and password
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/v2.4)
- [Google OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect)
- creating a long-lived, fixed [API key](#api-keys)

In all cases, the user gets redirected back to the client with an access token. Depending on client configuration, the access token is appended to the URL query string or set as cookie. For debugging, you may also configure a client to send the access token back in a JSON body, this will however not really work with the third-party login options due to the redirect-based OAuth flow.

The access token is a [JSON Web Token](http://jwt.io/) [[RFC 7519](https://tools.ietf.org/html/rfc751e9)] signed with RS512. The public RSA key can be obtained from the account server using the `ec:auth/public-key` relation for validation. The decrypted JWT contains the following information:

- `jti`: Token identifier (UUID)
- `sub`: Account ID (UUID)
- `email`: primary eMail address of the account
- `iss`: issuer ("entrecode")
- `iat`: timestamp (in seconds) the token was issued
- `exp`: expiration timestamp of the token (in seconds)

See [JWT libraries](http://jwt.io/#libraries) for JWT decoding and validating.

The issued access token has to be sent using the following HTTP Header:

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJlbWFpbCI6InRlc3RAZW50cmVjb2RlLmRlIiwianRpIjoiYjQ0MDE5ODAtODkwOC00OWIyLWE4YjQtYTBjOGI4OWQ2Nzk2IiwiaWF0IjoxNDQwNDk0MTI0LCJleHAiOjE0NDA0OTc3MjQsImlzcyI6ImVudHJlY29kZSIsInN1YiI6IjA3MDBkYWNlLTA1YTgtNDk2Zi05YTFhLTIwYTdmODQ4ODQ5NiJ9.O3HPjePx1uHsA4QyOAer3za0JrxpH_WiKV__9eTTD_2CwlGp2Mjv03wG49mdg_NQUIPFAISqJZMZTiTI0S3hPVYQ1N5_zhqSyWE29OJlCD0yFbcZIEglyydYydBhtj9yPgNhhjCKSSKjrTWqXlBV-KMrVJOqqmjVn55DEdATppqOWWQgI18_FXcL7zXZR5qGuZ8JTUBhCxQ9p1bu7ydRmJQHzxvoqfb_IN6sc6QycsOMs6pSrdatGK0GTFjyjvR1EWBaPgyTQo90Q0o9l7dLTQoueqdkzNH7A0BiRgGiqB775DeEBpGoO5oJYjVQGo7IcdKwIBKNV8WRvgecwT-w3w
    
The token can also be sent via query string property `_token`.
    
To acquire an access token, ec:auth/login for user credentials or ec:auth/facebook or ec:auth/google has to be called. See the Link Relation table of the [Entry Point Resource](resources/auth/#entry-point) for details.

## Client registration
Client registration is needed to obtain access tokens. Due to the authentication flow of OAuth, the end user is sent to the OAuth Provider in the browser, and afterwards redirected back to the client application. The access token can only be sent to the client using a valid redirect URL that gets the token appended as query string parameter or cookie.

The following information is needed:

- `clientID`: Unique string identifier for the client. Has to be appended to requests.
- `callbackURL`: URL to send the user agent back to after success
- `config` (JSON):
    - `tokenMethod`: Specifies how the token is sent back to the client. Values: `query`, `cookie` or `body`. Can also be an array with multiple values. `body` only works with local Authentication (email/password). Default: `query`
    - `disableStrategies`: Disallow one or more login strategies for this client. Array containing any of `facebook`, `google`, `password`. Default: `null` (all strategies enabled)

`config` can contain a parameter `"tokenMethod": "cookie"` for the token to be sent as cookie. Default is `query`, so the token gets sent in the query string as `token` parameter.

Clients are expected to look for the token in that parameter and save it locally. Note that they should be stored into cookies instead of HTML 5 Local Storage due to security issues (XSRF attacks): [Where to Store Your JWTs](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/)

# Authorization
entrecode uses a permission based authorization and permission system. Basically:

- accounts can be in any number of groups
- accounts as well as groups can have permissions
- account permissions are the sum of all permissions assigned directly to an account, as well as permissions assigned to any group the account is member of
- permissions are hierarchically organized in a [Shiro](http://shiro.apache.org/permissions.html)-like manner using [node shiro trie](https://github.com/entrecode/node-shiro-trie)

The available permissions are listed in the internal [entrecode Knowledge Base](https://confluence.entrecode.de/display/KB/Permissions) (Authentication needed).

# API Keys
API keys are [Account Resources](resources/account/) without an email address and with no possibility to sign in. Instead, they have one very long-lived access token. They may be used in special cases were a piece of software has to be able to use entrecode APIs just like a user account, without actually involving a user login. To create them, simply POST to `ec:account/create-anonymous` (included in the [Account List Resource](resources/account/#list)). The result is a JSON containing `jwt`, an almost indefinitely valid access token (~ 100 Years) as well as the corresponding `accountID`. After creation, this `accountID` has absolutely no permissions. You can, however, assign permissions to it or put it in a permission group. The access token is currently only visible after creation and cannot be accessed later, so it should be saved immediately.

# Account Server API

* **Entry Point:** [https://accounts.entrecode.de/](https://accounts.entrecode.de/)
* **[Richardson](http://martinfowler.com/articles/richardsonMaturityModel.html) Maturity Level:** 3 (full Hypermedia), except some Auth-related functionality
* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))
* **Root Resource:** `ec:auth` [(Auth Entry Point)](resources/auth/)
* **Authentication:** Bearer Token aquired using the [Account Server API](#authentication)

# State Diagram

[![State Diagram](img/statediagram-acc.svg)](img/statediagram-acc.svg)

# Relations

Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://doc.entrecode.de/en/latest/App_Manager/#link-relations/<relation>`. Those relations are also links to their own documentation (on this page). 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 

Additional to the official link relations defined by [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml) the App Manager uses the following:


| Link Relation             | Target Resource                               | Description |
|---------------------------|-----------------------------------------------------------|-------------|
| <a name="relation-auth"></a>`ec:auth`                  | [Auth](resources/auth/)                          | Entry Point|
|<a name="relation-auth/public-key"></a>`ec:auth/public-key`| [Auth/PublicKey](resources/auth/#public-key)  | Public RSA key for validation of access token JWTs |
|<a name="relation-auth/register"></a>`ec:auth/register`| [Auth/Signup](resources/auth/#signup) | Registration with email/password |
|<a name="relation-auth/login"></a>`ec:auth/login`| [Auth/Login](resources/auth/#login) | Login with email/password |
|<a name="relation-auth/logout"></a>`ec:auth/logout`| [Auth/Logout](resources/auth/#logout) | Invalidation of an access token |
|<a name="relation-auth/password-reset"></a>`ec:auth/password-reset`| [Auth/Password-Reset](resources/auth/#password-reset) | Changing a registered password |
|<a name="relation-auth/change-email"></a>`ec:auth/change-email`| [Auth/Change-Email](resources/auth/#change-email-address) | Changing the given email address with validation |
|<a name="relation-auth/email-available"></a>`ec:auth/email-available`| [Auth/Email-Available](resources/auth/#email-available) | Check if a given email is available for registration |
|<a name="relation-auth/facebook"></a>`ec:auth/facebook`| [Auth/Facebook](resources/auth/#googlefacebook-login) | Login/Register using Facebook |
|<a name="relation-auth/google"></a>`ec:auth/google`| [Auth/Google](resources/auth/#googlefacebook-login) | Login/Register using Google |
|<a name="relation-accounts"></a>`ec:accounts`| [Account List](resources/account/#list) | Account List |
|<a name="relation-account"></a>`ec:account`| [Account](resources/account/#single-account) | Single Account |
|<a name="relation-account/tokens"></a>`ec:account/tokens`| [Token List](resources/token/#list) | Access Tokens of an account |
|<a name="relation-account/token"></a>`ec:account/token`| [Token](resources/token/#single-token) | Single Access Token of an account |
|<a name="relation-account/create-anonymous"></a>`ec:account/create-anonymous`| [API Token](resources/auth/#api-token-anonymous-user) | POST to this resource to create a new anonymous account with an access token. (API key) |
|<a name="relation-acc/groups"></a>`ec:acc/groups`|[Account Group List](resources/group/#list) | List of Account groups |
|<a name="relation-acc/group"></a>`ec:acc/group`|[Account Group](resources/group/#list) | Single Account group |
|<a name="relation-invites"></a>`ec:invites`|[Invites Resource](resources/invite/) | Invites for Signups|

# Auth functions & REST

Some functionality of the Auth Server is not completely RESTful:

- Login and Signup (either via email/password or a third party provider) will redirect the user agent back after successful authentication, with a JWT in the query string or as cookie header.
- After registration, an email is sent to the user's email address for validation. After clicking the link, the user gets a HTML page with a success message.
- Password Reset renders a HTML page that tells the user to check her email account for a password reset email. The email contains a link to change the password, also on a HTML page rendered by the Account Server itself.
- eMail change also requires validation via eMail. The links in the emails (sent to both the old and the new address) render a HTML page.
