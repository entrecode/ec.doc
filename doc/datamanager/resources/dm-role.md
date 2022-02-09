## Single Data Manager Role
A single entrecode Data Manager Role.

Data Manager Accounts can be organized using Roles (Groups). This is needed to assign permissions to users, because model permission policies can only be assigned to roles and not to accounts directly.

There are default roles in Data Managers where new users get added to automatically. This is a behavior that can be configured for each role.

The JSON Schema is [https://entrecode.de/schema/dm-role](https://entrecode.de/schema/dm-role).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|roleID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a role | No. Gets generated on creation. |
|name| String | | Friendly name for the role | Yes |
|label| String | | A label for the role (filterable, for categorizing roles) | Yes |
|addUnregistered| Boolean | | Whether or not new anonymous accounts should be added to this role | Yes |
|addRegistered | Boolean | | Whether or not new registered accounts should be added to this role | Yes |
|accountsCount | Integer | | Number of accounts with this role | No |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [DM Role](#)| The resource itself | GET, PUT, DELETE |
| collection    | [DM Role List](#list)| List of all available Data Manager Roles | GET, POST |
| ec:datamanager| [Data Manager](./datamanager/) | Data Manager this resource belongs to | GET, PUT |
| ec:dm-accounts| [DM Account List](./dm-account#list)| List of accounts with this role | GET |

## List

The Data Manager Role List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Data Manager Role Resources.

## Possible Actions

## Read

To read a single Data Manager Role Resource, you may perform GET on a `ec:dm-role` relation.

To read the Data Manager Role List Resource, you may perform GET on a `ec:dm-roles` relation or on the `collection` relation of a single Data Manager Role resource.

In both cases, the success status code is **200 OK.**


#### Example
```
 {
        "roleID": "53361701-09a9-4401-a438-73e1a767c45b",
        "name": "Anonymous Users",
        "label": "",
        "addUnregistered": true,
        "addRegistered": false,
        "accounts": [],
        "_links": {
          "self": {
            "href": "https://datamanager.entrecode.de/role?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d&roleID=53361701-09a9-4401-a438-73e1a767c45b"
          },
          "collection": {
            "href": "https://datamanager.entrecode.de/role?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d"
          },
          "ec:datamanager": {
            "href": "https://datamanager.entrecode.de/?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d"
          }
        }
      }
```


## Create

To create a new Data Manager Role Resource, you may perform a POST on `ec:dm-roles` (the list resource). The JSON Schema for creating a new Data Manager Role is [https://entrecode.de/schema/dm-role-template](https://entrecode.de/schema/dm-role-template). 

Identical to [Edit](#edit).

The success status code is **201 Created** and the response body is the newly created single Data Manager Role resource.


## Edit

To update an existing Data Manager Role Resource, you may perform a PUT on `ec:dm-role` or `self` at a single Data Manager Role Resource. The JSON Schema for editing a Data Manager Role is [https://entrecode.de/schema/dm-role-template](https://entrecode.de/schema/dm-role-template). 

It is possible to make partial changes. Missing properties keep their old value.

The success status code is **200 OK** and the response body is the updated single Data Manager Role resource.


## Delete

To delete an existing Data Manager Role Resource, you may perform a DELETE on `ec:dm-role` or `self` at a single Data Manager Role Resource. 

The success status code is **204 No Content** with an empty response body.

