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