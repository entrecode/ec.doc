# Single Asset
A single asset.

Assets are abstract representations of a file, that can be available in multiple variants (e.g. different image sizes or localizations).

The JSON Schema is [https://entrecode.de/schema/asset](https://entrecode.de/schema/asset)

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
| assetID | String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for an Asset | No. Gets generated on creation. |
|title| String||A string title for this Asset. Inferred from the original file name of the uploaded file.|Yes
|type | String  | one of `image`, `video`, `audio`, `plain`, `document`, `spreadsheet` | Asset type | No|
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of the Asset| No. Gets written on creation. |
|deleted       | String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the deletion of the Asset. Only included when the asset is in the trash.|No|
|tags  | Array[String]| [Tag](./tag/) |Array of string tags for this asset| Yes |
|files |Array[JSON]| [File](#file-subresource)  |Array of actual files for this asset | Yes|
|private	| Boolean|	| Whether or not the asset was created private.|Yes|

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Asset](#)| The resource itself | GET, PUT, DELETE |
| collection    | [Asset List](#list)| List of all available Assets | GET, POST |
| ec:asset/best-file | File | Content-negotiated “best suited” file of this asset | GET |
| ec:datamanager| [Data Manager](./datamanager/) | Data Manager this resource belongs to | GET, PUT |
| ec:tag| [Tag](./tag/) | Tag of this asset | GET, PUT, DELETE |

# File Subresource
This subresource is included in the [Asset](#) resource.

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|mimetype | String | [RFC 2046](http://tools.ietf.org/html/rfc2046)    |The MIME Media type for this file| No |
|url | String |[RFC 3986](https://tools.ietf.org/html/rfc3986) | The URL of the file for retrieval. Can be overwritten with custom asset url (datamanager config `customAssetDomain` | No |
|size   | Number | Integer  |Size of the file in Bytes| No |
|resolution   | JSON  | | JSON object with additional metadata for this file. For image assets, it will contain properties like `width` and `height` to indicate the image resolution. | No |
|locale | String  | [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en-US`, `de-DE`, …)      |Locale of the asset file | Yes |
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of the file| No |
|modified| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the last modification of this file| No |

# List

The Asset List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Asset Resources.

## Read

To read a single Asset Resource, clients may perform GET on a `ec:asset` relation.

To read the Asset List Resource, clients may perform GET on a `ec:assets` relation or on the `collection` relation of a single Asset resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new asset, upload a file with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). MIME Type and basic properties are inferred from the uploaded file(s). The field name has to be `file`. 
Multiple files can be uploaded at once to create multiple assets with one call. You can also send a field `tags` or `title` to overwrite the default title and tags. `tags` must be a JSON.stringified array of strings.

Additionally a boolean field `private` can be sent to specify if the created asset should be private (read: only accessible by the creating user) or public (read: accessible by everyone in the data manager).

Response: **201 created** if everything went well. Response will contain link relations to newly created asset(s). They will not be embedded, however.

## Edit

To update an existing Asset Resource, clients may perform a PUT on `ec:asset` or `self` at a single Asset Resource.

Partial updates are possible.

Files:  Include to change locale of single files (`ec:asset/file` resource properties `url` and `locale` are required). If included, all files have to be included in the array. Files not included will be deleted.

To merge two assets, include a link relation to another asset in a PUT request (HAL links list should contain an `ec:api/asset` link relation). The target asset(s) will be merged into this one, if possible. 

To add an additional representation to an asset resource (e.g. another image resolution or document localized for another locale), the new file is POSTed to the `ec:api/asset` resource with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). The field name has to be `file`.

## Delete

To delete an asset, including its file representations, send a DELETE request to the `ec:api/asset` resource. This will move the asset to the trash.

## Deleted Assets

Deleted assets are the same as regular assets, however they have the `deleted` timestamp set. They get permanently deleted after some time.

To *permanently delete* a deleted asset right away, it has to be called with HTTP DELETE and the query string parameter `destroy=destroy`.
Output is **204 NO CONTENT**.

To *restore* a deleted asset, simple call DELETE on the deleted asset, without any additional query string parameter.
Output is **200 OK**.


