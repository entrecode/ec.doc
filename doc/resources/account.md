# account 
A single entrecode Account.

* [GET](#get)   
* [PUT](#put)

## GET
Show a single entrecode Account.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/account](https://entrecode.de/schema/account)

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
|hasPendingEmail   |(optional) Boolean indicating if the user has a pending email change
|isPrincess    |(optional) User Princess level of this account (unsigned Integer). Only included when accessing user is princess.
|openID        |(optional) Array of linked OAuth / Open ID Connect accounts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)
|permissions   |Permissions that are directly assigned to this account (excluding group permissions).|
|groups        |Groups this account is assigned to, including group permissions (permissions inherited by group membership). Is an Array of objects containing `name`, `groupID` and a `permissions` array). Groups are not linked to the group resource because other members may not be disclosed.|


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
  "permissions": [
    "a:b:c",
    "d:e:f
  ],
  "groups": [
    {
      "name": "datamanager-user",
      "groupID": "fc8aff95-fd00-4f98-ac06-61659b48657b",
      "permissions": [
        "dm-create"
      ]
    },
    {
      "name": "appserver-user"
      "groupID": "a6b78f95-fd00-4f98-ac06-61659b45f3e2",
      "permissions": [
        "app-create",
        "app:platform-create:web"
      ]
    }
  ]
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
|Authorization|`Bearer `token|

#### Body

JSON Schema: [https://entrecode.de/schema/account-template](https://entrecode.de/schema/account-template)

|Input field     |Description        |
|----------------|-------------------|
|email           |(optional) new email|
|newPassword     |(optional) new password|
|state           |(optional) the new account state, one of `active`, `inactive`, `blocked`, `deleted`|
|isPrincess|(optional, boolean) grants princess priviledges (admin/root)|
|language        |(optional) new language in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`de`, `en`…)|
|oldPassword     |(required for newPassword) current password for this account|
|openID     |(optional) Array of linked OAuth / OpenID Connect acconuts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)|
|permissions|(optional) Array of permissions. Note that this array has to be complete – non-included permissions will be revoked. If the property is missing, no changes in permissions are done. Note that permissions may be rejected (e.g. it is not possible to assign *).|

When changing `state` and/or `isPrincess`, the logged in user to perform this action needs to have princess (root/admin) access.

Deleting an OAuth / OpenID Connect connection is only allowed if `hasPassword` is true or an other connection which is not pending exists.

Editing the groups array is not possible using the Account Resource. Sending the property with a PUT request has no effect. To add accounts to a group, the group resource has to be edited.

Editing of `permissions` is not allowed by default, but only for special users (administrators/business account managers).

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



# [Account List](id:accounts)
List of accounts. Only accessible as privileged user.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of accounts.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:account/by-id |Retrieves an individual account resource based on the specified identifier. |GET|Yes. Requires the accountID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
account Resources with the properties `accountID`, `created`, `email`, `language`, `state`, `isPrincess`

*To also retrieve the `hasPassword` and `openID` fields, follow the `self` link to access the full resource.*
