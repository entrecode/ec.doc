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