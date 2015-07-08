### [Resource: ec:api/asset](id:api/asset)
A single asset.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Asset.|GET, PUT, POST, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of assets. Includes this asset. |GET, POST|No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|assetID |The unique identifier for this asset as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Asset. Inferred from the original file name of the uploaded file.|
|type         |Asset type, one of `image`, `video`, `audio`, `generic`, `document`, `spreadsheet`
|created       |Timestamp of the creation of this asset as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|tags          |Array of string tags for this asset|
|files         |Array of actual files for this asset, containing `ec:asset/file` subresources.
|private		| Whether or not the asset was created private.


#### PUT ec:api/asset
To modify an asset, a PUT call is required containing the following properties as JSON body:

| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Asset. If omitted, no change is done.|
|files         |Optional array of files. Include to change locale of single files (`ec:asset/file` resource properties `url` and `locale` are required). If included, all files have to be included in the array. Files not included will be deleted.
|private		| To change the private state of this asset.

To merge two assets, include a link relation to another asset in a PUT request (HAL links list should contain an `ec:api/asset` link relation). The target asset(s) will be merged into this one, if possible. 


#### POST ec:api/asset
To add an additional representation to an asset resource (e.g. another image resolution or document localized for another locale), the new file is POSTed to the `ec:api/asset` resource with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). The field name has to be `file`.

##### Output

* **200 ok** if everything went well

#### DELETE ec:asset
To delete an asset, including its file representations, send a DELETE request to the `ec:api/asset` resource. This will permanently delete the asset.

##### Output

* **204 no content** if everything went well


### [Resource: ec:asset/deleted](id:asset-deleted)
A single deleted asset.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Asset.|GET, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of deleted assets. Includes this asset. |GET|No.|
|ec:datamanager|The Data Manager Space this asset belongs to. |GET,PUT |No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|assetID |The unique identifier for this asset as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Asset. Inferred from the original file name of the uploaded file.|
|type         |Asset type, one of `image`, `video`, `audio`, `generic`, `document`, `spreadsheet`
|created       |Timestamp of the creation of this asset as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|deleted       |Timestamp of the deletion of this asset as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|tags          |Array of string tags for this asset|
|file          |Array of actual files for this asset, containing `ec:asset/file` subresources.

#### DELETE ec:assets/deleted
In order to restore/destroy a deleted asset a delete request to the specific asset needs to be called. 

##### Parameter
| Name         | Description     |
|--------------|-----------------|
|destroy (optional) |Parameter for destroying (irreversible delete) this asset. (`?destroy=destroy`)|

##### Output
* **200 OK** If everything went well. The `ec:asset` resource is included in the response
* **204 NO CONTENT** If the asset was successfully purged/destroyed.

### [Resource ec:assets/deleted](id:assets-deleted)
Collection of deleted assets in Data Manager.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of deleted assets.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager|The data manager these assets belong to.|GET,PUT|No.|
|ec:assets/deleted/by-id |Retrieves an individual deleted asset resource based on the specified identifier. |GET|Yes. Requires the assetID.


##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:asset/deleted` Resources.



### [Resource: ec:api/assets](id:api/assets)
Collection of assets in a Data Manager.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of assets.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:api/assets/by-id |Retrieves an individual asset resource based on the specified identifier. |GET|Yes. Requires the assetID.
|ec:api     | Link to the public API of this data manager| GET | No. |


##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:api/asset` Resources.

#### POST ec:assets
To create a new asset, upload a file with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). MIME Type and basic properties are inferred from the uploaded file(s). The field name has to be `file`. 
Multiple files can be uploaded at once to create multiple assets with one call.

Additionally a boolean field `private` can be sent to specify if the created asset should be private (read: only accessible by the creating user) or public (read: accessible by everyone in the data manager).

##### Output

* **201 created** if everything went well. Response will contain link relations to newly created asset(s). They will not be embedded, however.



#### Resource: ec:asset/file
This subresource is included in the ec:api/asset resource.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|mimetype      |The MIME Media type ([RFC 2046](http://tools.ietf.org/html/rfc2046)) for this file 
|url           |The URI ([RFC 3986](https://tools.ietf.org/html/rfc3986)) of the file for retrieval
|size          |Size of the file in Bytes
|resolution    |JSON object with additional metadata for this file. For image assets, it will contain properties like `width` and `height` to indicate the image resolution.
|locale        |Locale of the asset file in [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en-US`, `de-DE`, …)
|created       |Timestamp of the creation of the file as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|modified       |Timestamp of the last modification of this file as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|