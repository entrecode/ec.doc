## Single Group 
A single entrecode Permission Group.

Groups are instances – just as accounts – that can have permissions assigned to. Accounts can be added to groups, which grants the group permissions to all those accounts.
Membership in a group is always equal for all users (i.e. there is no "special" group membership). However, the creator of the group gets the right to edit the group (permissions and members) as personal permission assigned to his account.

The JSON Schema is [https://schema.entrecode.de/schema-acc/group](https://schema.entrecode.de/schema-acc/group)

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|groupID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a group | No. Gets generated on creation. |
|name   | String | | Name of the permission group. Has to be unique. | Yes|
|permissions   |Array[String]|[Shiro](https://www.npmjs.com/package/shiro-trie) permission string|Permissions that are assigned to this group. |Yes|
|customAuthDomain|String|URL|The custom domain from wich users in this group receive their auth mails.|Yes|
|customAuthDomainPriority|Number|0 - 100|The priority of the custom auth domain. Higher values means higher priority|Yes|

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Group](#)| The resource itself | GET, PUT |
| collection    | [Group List](#list)| List of all available Groups | GET |
| ec:account| [Account](./account/) | Embedded partial Account resources (containing `self` link, `accountID` and `email`) | GET |


## List

The Group List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Group Resources.

## Possible Actions

## Read

To read a single Group Resource, clients may perform GET on a `ec:group` relation.

To read the Group List Resource, clients may perform GET on a `ec:groups` relation or on the `collection` relation of a single Group resource.

In both cases, the success status code is **200 OK.**


#### Example
```
{
  "groupID": "00000000-0000-4444-8888-000000000000",
  "name": "an example group",
  "permissions": [
    "a:b:c",
    "d:e:f
  ],
  "customAuthDomain": "entrecode.de
  "customAuthDomainPriority": 50,
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


## Create

To create a new Group Resource, clients may perform a POST on `ec:groups` (the list resource). The JSON Schema for creating a new Group is [https://schema.entrecode.de/schema-acc/group-template](https://schema.entrecode.de/schema-acc/group-template). 

Identical to [Edit](#edit), but `name` and `permissions` are both required. Accounts can also be linked, however the account creating the group is added automatically.

Also, the creator will get the right to edit and delete the group.

The success status code is **201 Created** and the response body is the newly created single Group resource.


## Edit

To update an existing Group Resource, clients may perform a PUT on `ec:group` or `self` at a single Group Resource. The JSON Schema for editing a Group is [https://schema.entrecode.de/schema-acc/group-template](https://schema.entrecode.de/schema-acc/group-template). 

Embedded or linked: partial `ec:account` resources (with one of `accountID`, `email` or `_links.self` correctly set). Note that if at least one account resource is linked or embedded, the member accounts get rewritten. I.e., missing accounts will be removed.
If no accounts are sent, no changes are done. Therefore, you cannot remove all accounts from a group.

It is also possible to make partial changes (i.e. only edit `name`, `permissions`, `customAuthDomain`, `customAuthDomainPriority`, or only edit embedded accounts). In this case, the existing values should just be sent along to prevent errors.
If a property is changed, the client needs the corresponding permission – otherwise the change is being ignored while the rest of the edit is processed.

Note that it is possible to remove the client's own account (that gets added to the group on creation automatically). 

The success status code is **200 OK** and the response body is the updated single Group resource.


## Delete

To delete an existing Group Resource, clients may perform a DELETE on `ec:group` or `self` at a single Group Resource. 
Also deletes any permissions that were set for this group (account- and group-permissions).

The success status code is **204 No Content** with an empty response body.

