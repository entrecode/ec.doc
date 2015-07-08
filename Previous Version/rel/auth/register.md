### [Resource: auth/register](id:auth-register)

##### Input
To complete the registration process, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address this account should be linked to. SHOULD be proven for availability before (using auth/email-available)|
|password       |desired password for this account|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|

It is recommended to include an `Accept-Language` header to set the main language for the account. Otherwise, it will default to `en` (English).
See [RFC7231](https://tools.ietf.org/html/rfc7231#section-5.3.5) for details. 

##### Output

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

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **403 Forbidden** – returned if the eMail address is already taken or if the invite code is missing/invalid. Body contains detailed error code and message.