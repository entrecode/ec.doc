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