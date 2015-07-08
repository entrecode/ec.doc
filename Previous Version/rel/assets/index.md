### [Resource: ec:assets](id:assets)
Collection of assets in a Data Manager.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of assets.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager|The data manager these assets belong to.|GET,PUT|No.|
|ec:assets/by-id |Retrieves an individual asset resource based on the specified identifier. |GET|Yes. Requires the assetID.


##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:asset` Resources.

#### POST ec:assets
To create a new asset, upload a file with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). MIME Type and basic properties are inferred from the uploaded file(s). The field name has to be `file`. 
Multiple files can be uploaded at once to create multiple assets with one call.

##### Output

* **201 created** if everything went well. Response will contain link relations to newly created asset(s). They will not be embedded, however.