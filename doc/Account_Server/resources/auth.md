### [Entry Point Resource](id:entry-point)
When accessing the Entry Point, the following resource is returned containing links to available sub resources.

##### Links
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

##### Properties

If a valid access token is sent with the request (i.e. a user is logged in), the following status information is included with the response:

| Property     | Description     | 
|--------------|-----------------|
|language       |(optional) The primary UI language for the logged in account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |(optional) The account state, one of `active`, `inactive`, `blocked`
|userRole       |(optional) The user role of the logged in user, one of `user` or `princess`
|validUntil     |(optional) Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.
