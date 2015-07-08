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