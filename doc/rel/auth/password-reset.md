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