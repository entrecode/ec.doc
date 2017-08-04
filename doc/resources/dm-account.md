# Single Data Manager Account
A single entrecode Data Manager Account.

Data Manager Accounts represent users of the generated API. 

> *Note: This is not the same as the global entrecode [Account](./account/)!*

Data Manager Accounts get created by signing up as a user, either actually with email/password or an OAuth connection, or implicit as anonymous user.
This resource is for viewing and deleting those users.

The JSON Schema is [https://entrecode.de/schema/dm-account](https://entrecode.de/schema/dm-account).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|accountID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a account | No. Gets generated on creation. |
|email         |String|valid eMail Address or `null`|The primary eMail address of the account. If `null`, it is an anonymous account.| No|
|hasPassword| Boolean | | Whether or not a password is set | No |
| oauth | Array[String] | OAuth issuer identifiers | List of connected OAuth accounts | No |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [DM Account](#)| The resource itself | GET, DELETE |
| collection    | [DM Account List](#list)| List of all available Data Manager Accounts | GET |
| ec:datamanager| [Data Manager](./datamanager/) | Data Manager this resource belongs to | GET, PUT |
| ec:dm-role | [DM Roles](./dm-role/) | Roles this account is assigned to. Change by editing roles. | GET, PUT, DELETE |


# List

The Data Manager Account List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Data Manager Account Resources.

# Possible Actions

## Read

To read a single Data Manager Account Resource, you may perform GET on a `ec:dm-account` relation.

To read the Data Manager Account List Resource, you may perform GET on a `ec:dm-accounts` relation or on the `collection` relation of a single Data Manager Account resource.

In both cases, the success status code is **200 OK.**


#### Example
```
 {
        "accountID": "53361701-09a9-4401-a438-73e1a767c45b",
        "email": null,
        "hasPassword": false,
        "oauth": [],
        "_links": {
          "self": {
            "href": "https://datamanager.entrecode.de/account?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d&accountID=53361701-09a9-4401-a438-73e1a767c45b"
          },
          "collection": {
            "href": "https://datamanager.entrecode.de/account?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d"
          },
          "ec:datamanager": {
            "href": "https://datamanager.entrecode.de/?dataManagerID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d"
          }
        }
      }
```


## Create

Accounts cannot be created using the API, only using the [User Management](../data_manager/#user-management).

## Edit

Accounts cannot be edited using the API.

## Delete

To delete an existing Data Manager Account Resource, you may perform a DELETE on `ec:dm-account` or `self` at a single Data Manager Account Resource. 

The success status code is **204 No Content** with an empty response body. 
