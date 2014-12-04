# account 
A single entrecode Account.

## GET
Show a single entrecode Account.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `\<token\>|

### Response: 200 ok

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Account|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|[ec:account/tokens](https://entrecode.de/doc/rel/account/tokens)|Collection of access tokens for this account|GET|No.|
|collection    |Collection of accounts. Includes this account. Only included if user is princess.|GET|No.|

#### Properties
| Name         | Description     |
|--------------|-----------------|
|accountID     |The unique identifier for an account as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).
|created       |Date (UTC) of creation of this account in [RFC3339](https://tools.ietf.org/html/rfc3339) format.
|email         |The primary eMail address of the account
|language      |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state         |The account state, one of `active`, `inactive`, `blocked`, `deleted`
|hasPassword   |(optional) Boolean indicating if the user has a password set
|isPrincess    |(optional) User Princess level of this account (unsigned Integer). Only included when accessing user is princess.
|openID        |(optional) Array of linked OAuth / Open ID Connect accounts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)

#### Example
```
{
  "accountID": "00000000-0000-4444-8888-000000000000",
  "created": "2014-12-04T17:00:38.208Z",
  "email": "test@abc.de",
  "hasPassword": true,
  "language": "en",
  "openID": [ ],
  "state": "active",
  "_links": {
    "self": {
      "href": "https://accounts.entrecode.de/account?accountID=00000000-0000-4444-8888-000000000000"
    },
    "curies": {
      "href": "https://entrecode.de/doc/rel/{rel}",
      "templated": true
    },
    "ec:account/tokens": {
      "href": "https://accounts.entrecode.de/account/tokens?accountID=00000000-0000-4444-8888-000000000000"
    },
    "collection": {
      "href": "https://accounts.entrecode.de/accounts"
    }
  }
}
```

### Error Response: 401 unauthorized
If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.



## PUT
Edit an entrecode Account.
To change account data, the following has to be sent in a PUT Request:

### Request

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `\<token\>|

#### Body

|Input field     |Description        |
|----------------|-------------------|
|email           |(optional) new email|
|newPassword     |(optional) new password|
|state           |(optional) the new account state, one of `active`, `inactive`, `blocked`, `deleted`|
|isPrincess|(optional, boolean) grants princess priviledges (admin/root)|
|language        |(optional) new language in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`de`, `en`…)|
|oldPassword     |(required for newPassword) current password for this account|
|openID     |(optional) Array of linked OAuth / OpenID Connect acconuts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)|

When changing `state` and/or `isPrincess`, the logged in user to perform this action needs to have princess (root/admin) access.

Deleting an OAuth / OpenID Connect connection is only allowed if `hasPassword` is true or an other connection which is not pending exists.

### Response: 204 no content

The account was edited successfully.

### Error Response: 400 bad request

If the sent body is no JSON or not valid, the following error response is triggered:

#### Body
An error object.


### Error Response: 401 unauthorized

If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.