# Single Account 

A single entrecode Account.

The JSON Schema is [https://entrecode.de/schema/account](https://entrecode.de/schema/account).

# Properties
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|accountID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for an App | No. Gets generated on creation. |
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of the Account| No. Gets written on creation. |
|email         |String|valid eMail Address|The primary eMail address of the account| Yes|
|language      |String|Shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)|The primary UI language for this account|Yes|
|state         |String|`active`, `inactive`, `blocked`, `deleted`|The account state|Yes
|hasPassword   |Boolean|| Optional. Indicates if the user has a password set.|No|
|hasPendingEmail   |Boolean|| Optional. Indicates if the user has a pending email change|No|
|openID        |Array |OAuth Accounts|of linked OAuth / Open ID Connect accounts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)|Yes|
|permissions   |Array[String]|[Shiro](https://www.npmjs.com/package/shiro-trie) permission string|Permissions that are directly assigned to this account (excluding group permissions).|Yes|
|groups        |Array|objects containing `name`, `groupID` and a `permissions` array| Groups this account is assigned to, including group permissions (permissions inherited by group membership). Groups are not linked to the group resource because other members may not be disclosed.|No. Edit the group resource to change memberships.|

*Note to deprecated `isPrincess` field: This field is not included anymore. Just check for membership in the `Princesses` group.*

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Account](#)| The resource itself | GET, PUT |
| collection    | [Account List](#list)| List of all available Accounts | GET |
| ec:account/tokens | [Token List](./token/#list) | Collection of access tokens for this account | GET |

# List

The Account List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Account Resources.

# Possible Actions

## Read

To read a single Account Resource, clients may perform GET on a `ec:account` relation.

To read the Account List Resource, clients may perform GET on a `ec:accounts` relation or on the `collection` relation of a single App resource.

In both cases, the success status code is **200 OK.**


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

## Create

To create a new Account Resource, the Signup process has to be executed. See `ec:auth/register` relation.

## Edit

To update an existing App Resource, clients may perform a PUT on `ec:app` or `self` at a single App Resource. The JSON Schema for editing an App is [https://entrecode.de/schema/account-template](https://entrecode.de/schema/account-template). 

All fields are optional and need their own permission. Fields where no permission is available will be ignored.

Permissions:

```
acc:edit:<uuid>:language,email,openid,password
acc:change-state:<uuid>
acc:set-permissions:acc:<uuid>
```

For setting permissions, additionally the permission `acc:permissions:<permission>` is needed.
The permission `acc:set-password:<uuid>` enables changing the password without the need for `oldPassword` to be set.

Deleting an OAuth / OpenID Connect connection is only allowed if `hasPassword` is true or an other connection which is not pending exists. Adding a connection is not possible via PUT, instead a signup has to be done with an authenticated access token.

Updating the password requires the two fields `oldPassword` and `newPassword`.

Editing the groups array is not possible using the Account Resource. Sending the property with a PUT request has no effect. To add accounts to a group, the group resource has to be edited.

*Note to deprecated `isPrincess` field: This field is not included anymore. Just add account to the `Princesses` group.*

The success status code is **200 OK** and the response body is the updated single App resource.

## Delete

Deletion is not possible at the moment. However, the `state` can be set to `deleted`.
