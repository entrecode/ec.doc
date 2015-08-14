# group 
A single entrecode Permission Group.

Groups are instances – just as accounts – that can have permissions assigned to. Accounts can be added to groups, which grants the group permissions to all those accounts.
Membership in a group is always equal for all users (i.e. there is no "special" group membership). However, the creator of the group gets the right to edit the group (permissions and members) as personal permission assigned to his account.

* [GET](#get)   
* [PUT](#put)
* [DELETE] (#delete)

## GET
Show a single group.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/group](https://entrecode.de/schema/group)

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode permission group|GET, PUT, DELETE |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of groups. Includes this group.|GET, POST|No.|

#### Properties
| Name         | Description     |
|--------------|-----------------|
|groupID     |The unique identifier for a group as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).
|name          |Name of the permission group|
|permissions   |Permissions that are directly assigned to this account (excluding group permissions).|

#### Embedded

Account resources (containing `self` link, `accountID` and `email`).


#### Example
```
{
  "groupID": "00000000-0000-4444-8888-000000000000",
  "name": "an example group",
  "permissions": [
    "a:b:c",
    "d:e:f
  ],
  "_embedded": {
    "ec:account":
      [
        {
          "accountID": "fc8aff95-fd00-4f98-ac06-61659b48657b"
          "email": "test@entrecode.de"
          "_links": {
            "self": {
                "href": "https://accounts.entrecode.de/account?accountID=fc8aff95-fd00-4f98-ac06-61659b48657b"
            }
          }
        },
        {
          "accountID": "a6b78f95-fd00-4f98-ac06-61659b45f3e2"
          "email": "user@entrecode.de"
          "_links": {
            "self": {
                "href": "https://accounts.entrecode.de/account?accountID=a6b78f95-fd00-4f98-ac06-61659b45f3e2"
            }
          }
        }
      ]
  "_links": {
    "self": {
      "href": "https://accounts.entrecode.de/group?groupID=00000000-0000-4444-8888-000000000000"
    },
    "curies": {
      "href": "https://entrecode.de/doc/rel/{rel}",
      "templated": true
    },
    "collection": {
      "href": "https://accounts.entrecode.de/groups"
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
Edit an entrecode permission group.
To change group name, account memberships or permissions, the following has to be sent in a PUT Request:

### Request

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

#### Body

JSON Schema: [https://entrecode.de/schema/group-template](https://entrecode.de/schema/group-template)

|Input field     |Description        |
|----------------|-------------------|
|name           |new name|
|permissions| Array of permissions. Note that this array has to be complete – non-included permissions will be revoked. Note that permissions may be rejected (e.g. it is not possible to assign *).|

Embedded or linked: partial `ec:account` resources (with one of `accountID`, `email` or `_links.self` correctly set). Note that if at least one account resource is linked or embedded, the member accounts get rewritten. I.e., missing accounts will be removed.
If no accounts are sent, no changes are done. Therefore, you cannot remove all accounts from a group.

It is also possible to make partial changes (i.e. only edit `name`, only edit `permissions` or only edit embedded accounts). In this case, the existing values should just be sent along to prevent errors.
If a property is changed, the client needs the corresponding permission – otherwise the change is being ignored while the rest of the edit is processed.

Note that it is possible to remove the client's own account (that gets added to the group on creation automatically). 

### Response: 200 ok

The group was edited successfully.

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

## POST

Identical to [PUT](#put), but `name` and `permissions` are both required. Accounts can also be linked, however the account creating the group is added automatically.

Also, the creator will get the right to edit and delete the group.

Response: 201 created with the new group.

## DELETE

Deletes the group, no questions asked. Response: 204 no content.

Also deletes any permissions that were set for this group (account- and group-permissions).

# [Group List](id:groups)
List of groups.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of groups.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:group/by-id |Retrieves an individual group resource based on the specified identifier. |GET|Yes. Requires the groupID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
group Resources
