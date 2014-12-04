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