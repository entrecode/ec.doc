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