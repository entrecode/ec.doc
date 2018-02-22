# Single Asset Group 

Asset Group in a Data Manager. Asset Groups are used to organize Assets. Every (non-legacy) asset belongs to exactly one Asset Group.
Asset Groups can have settings that overwrite the global or Data Manager settings for its assets. 
Also, an Asset Group defines if the file URLs of its Asset are signed URLs or just plain URLs. This can never change in an Asset Group.

The JSON Schema is [https://entrecode.de/schema/dm-assetgroup](https://entrecode.de/schema/dm-assetgroup).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|assetGroupID| String | `^[a-z0-9_-]{1,32}$`| The unique identifier for an asset group | Yes, but only on creation. Cannot be changed afterwards. |
|public    | Boolean | true/false | Indicating if assets in this group are generally public or have signed URLs. | Yes, but only on creation. Cannot be changed afterwards. |
|settings  | JSON |   | various settings | Yes      |
|settings.urlExpiration | String | ISO-8601 formatted Duration String (PXXX…, [RFC 3339](http://tools.ietf.org/html/rfc3339)) | How long URLs will be valid, if this assetgroup is non-public. Overwrites global setting from Data Manager. | Yes |
|settings.disabledTypes | Array[String] | Array of either types ("image", "video", "audio", "plain", "document", "spreadsheet", "other") or mime-types. | List of asset types and mime types that may not be used in this group. | Yes, but values can only be removed. |
|settings.imageSizes | Array[Integer] | | List of available image sizes. | Yes, but values can only be added. |
|settings.thumbSizes | Array[Integer] | | List of available thumbnail sizes. | Yes, but values can only be added. |
|policies|Array[JSON] |Policy Definition | Permission Policies for Assets in this Asset Group | Yes|
|policies[].method| String | `get`, `put`, `post`, `delete`| The method the policy should apply to. | Yes |
|policies[].user| String | `public`, `dmUser`| The user type the policy should apply to. | Yes |
|policies[].conditions | JSON or `null` | See [https://entrecode.de/schema/dm-assetgroup#definitions/conditions](https://entrecode.de/schema/dm-assetgroup#definitions/conditions) | Additional conditions the assets need to fulfill. | Yes |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Asset Group](#)| The resource itself | GET, PUT |
| collection    | [Asset Group List](#list)| List of all available Asset Group | GET, POST|
| ec:datamanager| [Data Manager](../datamanager/) | The Data Manager this Asset Group belongs to | GET, PUT |
| ec:dm-assets  | [Asset List](../asset/#list) | The Assets of this Asset Group | GET, POST |

# List

The Asset Group List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Asset Group Resources.


# Possible Actions

## Read

To read a single Asset Group Resource, clients may perform GET on a `ec:dm-assetgroup` relation.

To read the Asset Group List Resource, clients may perform GET on a `ec:dm-assetgroups` relation or on the `collection` relation of a single Asset Group resource.

In both cases, the success status code is **200 OK.**


## Create

To create a new Asset Group, clients may perform a POST on `ec:dm-assetgroups` (the list resource). The JSON Schema for creating a new Asset Group is [https://entrecode.de/schema/dm-assetgroup-template-post](https://entrecode.de/schema/dm-assetgroup-template-post). 

The success status code is **201 Created** and the response body is the newly created single Asset Group resource.

## Edit

To update an existing Asset Group Resource, clients may perform a PUT on `ec:dm-assetgroup` or `self` at a single Asset Group Resource. The JSON Schema for editing a Asset Group is [https://entrecode.de/schema/dm-assetgroup-template-put](https://entrecode.de/schema/dm-assetgroup-template-put). 
All fields are optional. Some changes are restricted (see table above).

The success status code is **200 OK** and the response body is the updated single Asset Group resource.

## Delete

Deleting an Asset Group is currently not possible.
