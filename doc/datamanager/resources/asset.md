## Assets

Assets are abstract representations of files. Usually, they also contain one or more thumbnails in different sizes. Image assets also support different image dimensions. 

*Note on legacy assets: the [former implementation](#single-asset-legacy-assets) is still available but deprecated.*

## Single Asset
A single asset.

The JSON Schema is [https://entrecode.de/schema/dm-asset](https://entrecode.de/schema/dm-asset)

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
| assetID  | String | base64url-encoded UUIDv4 (`^[a-zA-Z0-9\\-_]{22}$`) | The unique identifier for an Asset | No. Gets generated on creation. |
| title    | String |      | A string title for this Asset. Inferred from the original file name of the uploaded file.| Yes |
| caption  | String |	   | A string caption for this Asset. | Yes |
| type 	   | String | one of `image`, `video`, `audio`, `plain`, `document`, `spreadsheet`, `other` | Asset type | No |
| mimetype | String | `^(image|video|audio|text|application)\/[a-z0-9\\.+-]+$` | MIME-Type of the Asset file | No |
| created  | String | ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of the Asset| No. Gets written on creation. |
| modified | String, `null` | ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the last modification of the Asset | No. Gets written on updates. |
| creator  | String, `null` | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122)) | The accountID of the creator, if available. | No. Gets written on creation. |
| creatorType | String | `ecUser`, `dmUser`, or `public` | The type of user that created the asset. | No. Gets written on creation. |
| tags     | Array[String] | [Tag](./tag/) | Array of string tags for this asset | Yes |
| file     | JSON |        | Main Asset file | No. Gets written on creation. |
| file.url | String | URL  | The generated URL to retrieve the asset file. | No |
| file.size | Integer |    | Bytesize of the uploaded File | No |
| file.resolution | JSON, `null` | Properties `width` and `height` | Resolution of the image file variant in pixels. | No |
| fileVariants | Array[JSON] | | List of File Variants, if this is an image. | No. Missing image resolutions can created by requesting them. |
| fileVariants[].url | String | URL | The generated URL to retrieve the asset file variant. | No |
| fileVariants[].size | Integer | | Bytesize of the uploaded File | No |
| fileVariants[].resolution | JSON, `null` | Properties `width` and `height` | No |
| thumbnails | Array[JSON] | | List of Thumbnails. | No. Missing thumbnail resolutions can created by requesting them. |
| thumbnails[].url | String | URL | The generated URL to retrieve the asset thumbnail. | No |
| thumbnails[].dimension | Integer | | Resolution of the square thumbnail image in pixel. | No |
| isUsed   | Boolean |     | Indicates if this Asset is used in an Asset/Assets field of an Entry in this Data Manager. | No, dynamically changes its value. |
| duplicates | Integer |   | Number of duplicate Assets of this Asset in the same Asset Group. | No, dynamically changes its value. |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Asset](#)| The resource itself | GET, PUT, DELETE |
| collection    | [Asset List](#list)| List of all available Assets in this Asset Group| GET, POST |
| ec:dm-asset/file | File 		  | The main file URL. | GET      |
| ec:dm-asset/file-variant | File | File variant URL(s) | GET     |
| ec:dm-asset/thumbnail | File    | Thumbnail URL(s) | GET        |
| ec:dm-asset/duplicates | [Asset List](#list) | List of Assets that are duplicates, if applicable | GET |

Using the `ec:dm-asset/file-variant` and `ec:dm-asset/thumbnail` relations (both are templated URLs) you can get different sizes of images and thumbnails. 
The size property is a minimum-size the target image should have. The next bigger configured size is returned. There are global default sizes, that can be overwritten in Data Manager settings and Asset Group Settings. 
In the `fileVariants`/`thumbnails` JSON properties only files that were requested before are included. Use the relations to trigger rendering of new sizes; they get returned immediately. 

## Updating Assets

To update an existing Asset Resource, clients may perform a PUT on `ec:dm-asset` or `self` at a single Asset Resource.

Partial updates are possible.
Changeable properties are `title`, `tags` and `caption`. 
It is not possible to change the file itself.

## List

The Asset List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Asset Resources.

## Relations

(additionally to the default relations)

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Asset List](#list)| The Assets List| GET, POST |
| ec:dm-asset/by-id | [Asset](#)  | Templated Link to Assets | GET, PUT, DELETE |
| ec:dm-assets/options | [Asset List](#list) | Templated Link to Assets list | GET |
| ec:dm-assetgroup | [Asset Group](./dm-assetgroup/) | Asset Group of this Asset List | GET, PUT |
| ec:api | Generated API Entry point | Root page of the generated API | GET |

## Creating Assets

To create a new asset, upload a file with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)) . MIME Type and basic properties are inferred from the uploaded file(s). The field name should be `file`. 
Multiple files can be uploaded at once to create multiple assets with one call. 
Assets always have to be uploaded to exactly one Asset Group.
It is also possible to create an asset from an url. Simple attach the desired files with the field name `url` and DataManager will load the files and create assets.

Response: **201 created** if everything went well. Response will contain the created Asset resource(s).

### Filenames

By default, a filename is generated using the original file's filename. You can also set the field name to something else than `file` to overwrite the filename – even sub-paths are possible this way. Note that if you want a file extension, you still have to deliver the file extension in the field name. On the other hand, it is possible this way to have files online without an extension.
As an option, a random filename can be generated. This may be better for user-uploaded stuff. For that, send the field `preserveFilenames` with value `false`. The file extension is inferred from the uploaded file.
The default (`preserveFilenames=true` and `includeAssetIDInPath=true`) may be different for single Data Managers or Asset Groups.

### defaultVariants

Variant sizes of image assets are normally generated on request. This should be the default. Once requested for the first time, they are generated. In some cases it may be useful to have a specific variant size right upon creation of the asset. This can be done by sending `defaultVariants` property, which should be a (stringified) Integer or Integer Array. The value(s) should be a subset of the configured image sizes.

### De-duplication

By default, a de-duplication check is performed. Assets that already exist in this Asset Group are rejected with Error 2375.
If you want to disable this check and enforce uploading the file, you may send the field `ignoreDuplicates` with value `true` in the multipart/form-data request.
If you want to receive an already uplooaded file, you may send the field `deduplicate` with value `true` in the multipart/form-data request. You will then receive the first duplicate file for any given upload.

*Sending other properties in the fields was a feature of legacy assets and is deprecated.*


## Single Asset (Legacy Assets)
A single (legacy) asset.

## DEPRECATION NOTICE

*Legacy Assets are deprecated. They can be soft-disabled with the data manager setting `"disableLegacyAssets": true`.*

Assets are abstract representations of a file, that can be available in multiple variants (e.g. different image sizes or localizations).

The JSON Schema is [https://entrecode.de/schema/asset](https://entrecode.de/schema/asset)

## Properties (Legacy Assets)

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

## Relations (Legacy Assets)

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Asset](#)| The resource itself | GET, PUT, DELETE |
| collection    | [Asset List](#list)| List of all available Assets | GET, POST |
| ec:asset/best-file | File | Content-negotiated “best suited” file of this asset | GET |
| ec:datamanager| [Data Manager](./datamanager/) | Data Manager this resource belongs to | GET, PUT |
| ec:tag| [Tag](./tag/) | Tag of this asset | GET, PUT, DELETE |

## File Subresource (Legacy Assets)
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

## List (Legacy Assets)

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


