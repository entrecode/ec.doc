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