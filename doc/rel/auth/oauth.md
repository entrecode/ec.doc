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
