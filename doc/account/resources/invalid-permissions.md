## Invalid Permission

List of invalid Permissions.

> Note: This resource requires `acc:invalid-permissions:view,delete`, `dm-stats`, and `app-stats` permission.

The JSON Schema is [https://schema.entrecode.de/schema-acc/invalidpermissions](https://schema.entrecode.de/schema-acc/invalidpermissions).

## Properties
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|invalidAccountPermissions| Array | [Permission Element](#permission-element) | Array of all invalid account permissions. | No. |
|invalidGroupPermissions| Array | [Permission Element](#permission-element) | Array of all invalid group permissions. | No. |

## Permission Element
| Property | Type | Format | Description |
|----------|------|--------|-------------|
| accountID or groupID | String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122)) | The accountID or groupID which holds this invalid permission.
| permission | String |	[Shiro](https://www.npmjs.com/package/shiro-trie) permission string | The invalid permission |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Invalid Permissions](#)| The resource itself | GET, DELETE |
| ec:auth       | [Auth “Resource”](./auth/)| The Auth “Resource” | GET |


## Possible Actions

## Read

To read the Invalid Permissions resource, clients may perform GET on a `ec:invalid-permissions` relation.

The success status code is **200 OK.**


#### Example
```
```

## Delete

To delete all invalid Permissions, clients may perform DELETE on the resource.

The success status code is **204 No Content.**
