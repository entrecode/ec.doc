### [Resource: account/token](id:account-token)
A single access token.
Note that the token itself will never be published by the API to prevent misusing them; instead this resource will deliver metadata to enable an overview of issued tokens and the possibility to revoke them.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An access token. |GET, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:account       |The account of this access token.|GET|No.|
|collection    |Collection of access tokens. Includes this token.|GET|No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|accessTokenID |The unique identifier for an access token as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)). This is NOT the token itself.
|device      |Device this access token was issued to. JSON object provided by [express-useragent](https://github.com/biggora/express-useragent#or-manual-setup-in-project-configenvironmentjs). Notable properties are `Platform`, `OS` and `Browser`.
|ipAddress     |IP Address this access token was issued to (IPv6 or IPv4)
|ipAddressLocation|Assumed Location of the IP Address this access token was issued to as string (e.g. city name)
|isCurrent     |Boolean flag indicating that this access token is the one currently used for this request
|issued        |Timestamp of the creation of this access token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))
|validUntil    |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.