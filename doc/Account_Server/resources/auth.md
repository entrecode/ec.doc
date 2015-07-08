# [Entry Point Resource](id:entry-point)
When accessing the Entry Point, the following resource is returned containing links to available sub resources.

<h2>Links</h2>


| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |The Entry Point itself.|GET    |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:accounts      |Collection of accounts. Only included for privileged users.|GET|No.|
|ec:account       |The single account of the logged in user.|GET|No.|
|ec:auth/register |Used to register a new account using credentials.|POST|No.|
|ec:auth/login    |Used to login using credentials|POST|No.|
|ec:auth/logout   |Used to logout a logged in user|POST|No.|
|ec:auth/password-reset|Used to send an email in case a user forgot her credentials|POST, PUT, DELETE|Yes. Requires the eMail and optional token.|
|ec:auth/email-available|Used to determine if an email address is still available for registration.|GET |Yes. Requires the eMail address to check.|
|ec:auth/email-verification|Used to tell the API Server that an eMail token verification link was openend.|POST|No.|
|ec:auth/oauth    |Used to login and/or register using an OAuth Provider|POST|No.|
|ec:account/change-email-verification     |Used to abort/verify an eMail change. (Created with PUT account)|PUT, DELETE|YES. Token of this verification.|

<h2>Properties</h2>

If a valid access token is sent with the request (i.e. a user is logged in), the following status information is included with the response:

| Property     | Description     | 
|--------------|-----------------|
|language       |(optional) The primary UI language for the logged in account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |(optional) The account state, one of `active`, `inactive`, `blocked`
|userRole       |(optional) The user role of the logged in user, one of `user` or `princess`
|validUntil     |(optional) Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.



# [Resource: auth/register](id:auth-register)

<h2>Input</h2>
To complete the registration process, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address this account should be linked to. SHOULD be proven for availability before (using auth/email-available)|
|password       |desired password for this account|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|

It is recommended to include an `Accept-Language` header to set the main language for the account. Otherwise, it will default to `en` (English).
See [RFC7231](https://tools.ietf.org/html/rfc7231#section-5.3.5) for details. 

<h2>Output</h2>

* **201 created**

If the user has registered successfully, she is automatically logged in. However, the account state is `inactive` until the eMail address is validated.

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

*If the account state is `blocked`, no accessToken is included. The client should display an error message.*

<h2>Error Output</h2>
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **403 Forbidden** – returned if the eMail address is already taken or if the invite code is missing/invalid. Body contains detailed error code and message.



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







### [Resource: auth/email-verification](id:auth-email-verification)

##### Input
This Resource tells the API server that a user who got an eMail address verification eMail clicked on the included link and is thereby the rightful owner of the given address.
The following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address the token verifies|
|token          |the token that was included in the eMail link|


##### Output

* **204 no content** 

*Note: if the token sent again, the 204 response will be repeated as long as the eMail address is the main address of the account, no error output will be returned for multiple clicks on the verification link.*

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the given token was not found in the database.


### [Resource: auth/login](id:auth-login)

##### Input
To log in a user using user credentials, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the desired account|
|password       |password for this account|


##### Output

* **200 ok**

If the user credentials are correct, the user is automatically logged in. Note that `state` may still be `inactive`. 

####### if the user credentials were correct (with code 200):

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3y-339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.
|linked         |(optional) the oauth_issuer that was additionally linked to this account.

####### if the user credentials were NOT correct (with code 401):
|Field          |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|lockUntil      |Timestamp of the time until which all login requests for this eMail address will be refused as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)).|


##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **401 Unauthorized** - returned if the `state` of the user is `blocked`. Or the password/eMail combination did not match.
* **403 Forbidden** – returned if there were too many wrong login attempts for this eMail address.


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


### [Resource: auth/oauth](id:auth-oauth)

Route for logging in or registering using OAuth 2.0 / an OpenID Connect Provider.

##### Input
To complete the registration process, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|oauthIssuer   |The OAuth Provider. `google`, `facebook` or the OpenID URL of a generic OpenID Connect Provider.|
|oauthCode     |the authorization code retrieved from the OAuth Provider|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|

##### Output

###### success:

* **201 created** - if the user is new and now registered
* **200 ok** - for logging in with oauth as an already registered user

If the user has logged in and/or registered successfully, the following is returned:

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|message        |(optional) an informational object containing `message` and `info` properties. See below for details.|
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.
|linked         |(optional) the oauth_issuer that was additionally linked to this account.

**Updated eMail:** If an OAuth login returned a new/changed email address than the one deposited at the user's account, the `message` field will be included and contain a `message` with the value `updatedEmail` and the new email address in the `info` field. The intended application flow is to tell the user that she should check if her email address is still correct.

###### wrong OAuth provider selected:

* **200 ok**

If the user logged in using an OAuth Provider she did not use before (matching eMail address), the following is returned instead:

|Field          |Description        |
|---------------|-------------------|
|email          |eMail address of the logged in account|
|needsConfirmationWithOtherLoginMethod |Array of possible other login methods. Contains the following properties: accountID, iss, extEmail, extName, pending|

The intended application flow is to send the user to the previously used OAuth Provider (one of `needsConfirmationWithOtherLoginMethod`). After this OAuth request is received, the login will be successful and contain the `linked` attribute. If `iss` is `password`, an email/password login is required. 

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **403 Forbidden** – returned if the invite code is missing/invalid. Body contains detailed error code and message.




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

