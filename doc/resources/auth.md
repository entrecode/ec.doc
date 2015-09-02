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
|ec:auth/login    |Used to login using credentials|POST|Yes. Requires `clientID`.|
|ec:auth/logout   |Used to logout a logged in user|POST|No.|
|ec:auth/password-reset|Used to send an email in case a user forgot her credentials|POST, PUT, DELETE|Yes. Requires the eMail and optional token.|
|ec:auth/email-available|Used to determine if an email address is still available for registration.|GET |Yes. Requires the eMail address to check.|
|ec:auth/facebook |Used to login and/or register using Facebook|POST|Yes. Requires `clientID` and `invite` (if activated and not registered yet).|
|ec:auth/google |Used to login and/or register using Google|POST|Yes. Requires `clientID` and `invite` (if activated and not registered yet).|
|ec:auth/public-key |Returns the Server public key as pem file for checking signed tokens.|GET|No.|


# Authentication

The authentication relations (`ec:auth/register`, `ec:auth/login`, `ec:auth/facebook` and `ec:auth/google`) work different than the rest of the API. Because of OAuth authentication flow, they don't act RESTfully in the sense that they return a JSON document: instead they redirect the user agent back to the client after successful (or failing)  authentication. For that matter, a valid `clientID` has to be sent with each request. Only valid (registered) clients can send these requests, because the callback URL the user agent gets redirected back to has to be known on the server. An access token is appended to the callback URL on redirection, or optionally sent as cookie. These requests are not designed to be used via AJAX, but plain browser HTTP (links/forms).
If errors occur, a readable error code gets appended to the callback URL.

## Registration

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

*`missing_clientID` and `clientID_not_found` are not appended to a registered callback URL but instead the user is redirected back to the HTTP Referer with those codes appended. If no Referer field is set, it triggers HTTP 400 (missing) or HTTP 404 (not found).*

### Connecting accounts / login methods

To connect an Facebook or Google account to an existing account (no matter how it got created), or to set a password to an existing account, the above relations for registration, google and facebook can be used. If a valid access token is sent (either via HTTP Authorization header as Bearer token, or as query parameter `token`) with those requests, the server will try to connect the new login method with the existing account.


# Other resources (RESTful)

### [Resource: auth/email-available](id:auth-email-available)

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


### [Resource: auth/logout](id:auth-logout)
##### Input
To log out a user, the following has to be sent in a POST Request:

This request has to include a valid access token. If the access tokens lifespan is expired but other than that valid the logout will result in a **204 no content** response.

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the logged in account|


##### Output

* **204 no content** if the logout succeeded.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined/

* **401 Unauthorized**  if the eMail address does not match the access token.


### [Resource: auth/password-reset](id:auth-password-reset)

#### Request a password reset
##### Parameter
To send an eMail to a user providing the possibility to reset the password, the following has to be sent as parameters in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|


##### Output

* **202 accepted** if the server is sending the email.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the eMail is not linked to any account.

#### Perform a password reset
##### Parameter
To reset a password, the following has to be sent as parameters in a PUT Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|password       |new password|

##### Input
To reset a password, the following has to be sent in a PUT Request:

|Input field    |Description        |
|---------------|-------------------|
|token          |password reset token|


##### Output

* **201 created** if the password reset was successful.

The user is automatically logged in after the reset, additionally the token will be invalidated. Output body is the same as with [auth/login](#auth-login).

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

*If the account state is `blocked`, no accessToken is included. The client should display an error message.*

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the eMail or token is not linked to any account.

#### Abort a passwort reset.
##### Parameter
To abort a password reset, the following has to be sent as parameters in a DELETE Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|token          |password reset token|

##### Output

* **204 no content** if the password reset token was successfully invalidated or does not exist.



### [Resource: account/change-email-verification](id:account-change-email-verificaton)
When the user has requested to change her primary email, this resource is used to verify or abort the change.

#### PUT account/change-email-verification
##### Parameter
To complete the eMail change the following has to be sent as parameters in a PUT request.

|Input field    |Description        |
|---------------|-------------------|
|token          |verification token for this change|

##### Output
* **204 no content** if the change was successfully verified.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** – if the token did not produce a match

#### DELETE account/change-email-verification 
##### Parameter
To abort the eMail change the following has to be sent as parameters in a DELETE request.

|Input field    |Description        |
|---------------|-------------------|
|token          |verification token for this change|

##### Output
* **204 no content** if the token was successfully revoked.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** – if the token did not produce a match.
