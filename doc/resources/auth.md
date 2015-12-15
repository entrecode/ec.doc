# The Auth “Resource”

This resource has many faces, and is more of a accumulation of multiple auth-related resources.

# Entry Point
When accessing the Entry Point, the following resource is returned containing links to available sub resources.

## Relations


| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |The Entry Point itself.|GET    |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:accounts      |Collection of accounts. Only included for privileged users.|GET|No.|
|ec:account       |The single account of the logged in user.|GET|No.|
|ec:auth/register |Used to register a new account using credentials.|POST|Yes. Requires `clientID` and `invite` (if activated).|
|ec:invites     | List of available invites | GET, POST | No. |
|ec:auth/login    |Used to login using credentials|POST|Yes. Requires `clientID`.|
|ec:auth/logout   |Used to logout a logged in user|GET, POST|Yes. Optionally, the token can be sent as Query String.|
|ec:auth/password-reset|Used to send an email in case a user forgot her credentials|GET|Yes. Requires `eMail` and `clientID`|
|ec:auth/email-available|Used to determine if an email address is still available for registration.|GET |Yes. Requires the eMail address to check.|
|ec:auth/facebook |Used to login and/or register using Facebook|POST|Yes. Requires `clientID` and `invite` (if activated and not registered yet).|
|ec:auth/google |Used to login and/or register using Google|POST|Yes. Requires `clientID` and `invite` (if activated and not registered yet).|
|ec:auth/public-key |Returns the Server public key as pem file for checking signed tokens.|GET|No.|


# Authentication

The authentication relations (`ec:auth/register`, `ec:auth/login`, `ec:auth/facebook` and `ec:auth/google`) work different than the rest of the API. Because of OAuth authentication flow, they don't act RESTfully in the sense that they return a JSON document: instead they redirect the user agent back to the client after successful (or failing)  authentication. For that matter, a valid `clientID` has to be sent with each request. Only valid (registered) clients can send these requests, because the callback URL the user agent gets redirected back to has to be known on the server. An access token is appended to the callback URL on redirection, or optionally sent as cookie. These requests are not designed to be used via AJAX, but plain browser HTTP (links/forms).
If errors occur, a readable error code gets appended to the callback URL.

## Signup

##### Input
To complete the registration process, the following has to be sent in a POST Request using `application/x-www-form-urlencoded` (default HTML form):

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address this account should be linked to. SHOULD be proven for availability before (using ec:auth/email-available)|
|password       |desired password for this account. Has to be at least 4 characters long.|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|


## Login

##### Input
To log in a user using user credentials, the following has to be sent in a POST Request using `application/x-www-form-urlencoded` (default HTML form):

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the desired account|
|password       |password for this account|

*For debugging (e.g. in Postman), this relation can also be sent in a JSON body. The result token is then also sent back directly, without redirects.*

## Google/Facebook Login

##### Input
To login and optionally register using a Google or Facebook account, follow this relation (simple GET). Note that the `clientID` query string parameter is still needed, as well as an `invite` (here also sent as query string parameter) if configured. The user will redirected to the auth provider for credentials.

## API Token (anonymous user)

An API Token (=Anonymous user) can only login once, on registration, and gets a JWT that is valid almost indefinitely long (about 100 Years). To obtain it, simple send an empty POST to the `ec:account/create-anonymous` resource. The response is the default authentication response, similar to after a regular signup.

## Logout

Log out a user. The used access token's `validUntil` timestamp will be altered to now, which makes it unusable for further actions. This only affects this one access token – if the account is still logged in at another device, this is unaffected by the logout operation.

**Variant A: GET** 

A plain GET request, usable for Hyperlinking, with the access token to invalidate attached as query string value for `token`.

**Variant B: POST**

POST request with Bearer authentication. The used token will be invalidated.

Both requests also require a valid `clientID`. The user agent will get redirected back to the registered callback URL.

## Password Reset

Send the user an email with links to reset the password.
GET the `ec:auth/password-reset` with `email` and `clientID` template parameters to trigger the password reset. The user agent will get an HTML rendered message for confirmation. 
The account owner will get an email with two links: for aborting and for setting the new password. Both render an HTML site. After successful resetting the password, the user will be taken back to the origin client with an login response (just as if he successfully authenticated in the first place). 

## Change eMail address

An eMail address change is only possible through validation (i.e. opening a link sent to the address).

##### Input
The following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |new eMail address of the account|


##### Output

* **200 ok** 

The response is a HTML page telling the user that an email to the new address has been sent. 
The change will only be permanent after the link has been opened.
There will also be a link sent to the old email address. By clicking that link, the link for the new address becomes invalid. If the change has already been approved, it will be changed back to the old address.


##  Authentication Response

* **302 Found**

The user agent is always redirected back to the client, using the registered `callbackURL`. 
If the user has registered successfully, she is automatically logged in. However, the account state is `inactive` until the eMail address is validated (only register).

The access Token (as signed JSON Web Token) is appended to the callbackURL's query string as `token` value.

Clients may decode them using a [JWT library](http://jwt.io/#libraries) to get the containing information: `email`, `jti` (Token ID), `iat` (Timestamp issued), `exp` (Timestamp of expiration), `iss` (`entrecode`), and `sub` (Account ID).
To get further account information, clients can authenticate with this token at the entry point resource and follow the then contained `ec:account` relation to their account information.

If an Error occured, an error code is appended to the callbackURL's query string as `error` value. 
These errors are no full JSON errors as the rest of the API use, but plain strings:

### Auth Errors
|Error code                 |Description|
|---------------------------|-----------|
|`account_blocked`          | The account is blocked, the user cannot login |
|`account_not_found`        | No account found for this email address |
|`auth_error`               | Generic auth error (probably server-side) |
|`clientID_not_found`       | clientID not found in client registry |
|`db_error`                 | Generic db error (server-side) |
|`email_unavailable`        | An account with this email address already exists |
|`invalid_email`            | No valid email address |
|`invalid_invite`           | No valid invite code (UUIDv4) |
|`missing_clientID`         | clientID is missing |
|`missing_credentials`      | email and/or password fields are missing |
|`password_too_short`       | The password is too short, must be at least 4 characters long |
|`session_not_found`        | Internal error (session could not be re-established after external OAuth process) |
|`token_not_found`          | The access token could not be found |
|`too_many_login_attempts`  | Too many login attempts, please wait. |
|`wrong_password`           | Wrong password entered on login. Additionally, a `lockUntil` parameter is appended to the callback URL, containing a timestamp until the login is blocked. |

*`missing_clientID` and `clientID_not_found` are not appended to a registered callback URL but instead the user is redirected back to the HTTP Referer with those codes appended. If no Referer field is set, it triggers HTTP 400 (when `missing_clientID`) or HTTP 404 (when `clientID_not_found`).*

### Connecting accounts / login methods

To connect an Facebook or Google account to an existing account (no matter how it got created), or to set a password to an existing account, the above relations for registration, google and facebook can be used. If a valid access token is sent (either via HTTP Authorization header as Bearer token, or as query parameter `token`) with those requests, the server will try to connect the new login method with the existing account.

## Public Key

The `ec:public-key` relation returns the Public RSA Key of the Server in PEM format for validation of the token signature.

## email-available

##### Input
This Resource allows verification if an eMail address is still available for registration.
The following has to be sent in a GET **(!)** Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|


##### Output

* **200 ok** 

|Field          |Description        |
|---------------|-------------------|
|email          |eMail address that was checked|
|available      |true or false    |

