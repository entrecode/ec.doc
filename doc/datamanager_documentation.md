# Data Manager API Documentation

This document describes the Hypermedia REST API of the entrecode Data Manager API.

* **Entry Point:** [https://datamanager.entrecode.de/](https://datamanager.entrecode.de/)
* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))

## Basics

A user can, in general, have any number of Data Manager “Spaces”. The exact number may be limited by the customers plan. A single Data Manager Space manages Assets (Files) and Models with Entries (RESTful Resources).

### Authentication
Most API Calls require Authorization. 
The issued Authorization Token (`access_token`) has to be sent using the following HTTP Header:

    Authorization: Bearer AbCdEf1234567890
    
The Access Token has to be acquired using the [Accounts API](https://accounts.entrecode.de). 


### Relations
Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://entrecode.de/spec/rels/<relation>/<optional_subrelation>`. Those relations are also links to their own documentation. 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 

### Resources
* [ec:datamanagers](#datamanagers) (Entry Point)
    * [ec:datamanager](#datamanager)
        * [ec:assets](#assets)
            * [ec:asset](#asset)
        * [ec:assets/deleted](#assets-deleted)
            * [ec:asset/deleted](#asset-deleted)
        * *[ec:models](#models) (tbd)*
            * *tbd*

### Generic list resources
In general (i.e. unless stated otherwise), list resources support pagination, sorting and filtering.

##### Pagination:
Link relations `prev`, `next` and `first` SHOULD be used for pagination.
Internally, pagination is realized with the query string parameters `page` and `size`. 
`page` defaults to `1` and `size` defaults to `10`. 

##### Sorting:
To sort by a different than the default property, the following query string parameter can be used: `sort={direction}{property}` where `direction` defaults to `+` (ascending order) and can be set to `-` (descending order).

##### Filtering:
**Exact Match:** A query string parameter of the form `{property}={value}` can be used for an exact-match filter. If used with an ID parameter, only one item will be returned and no list resource.

**Search:** A query string parameter of the form `{property}~={value}` can be used for searching (non-exact-match filter).

**Ranges:** A query string parameter of the form `{property}From={value}` and `{property}To={value}` can be used for specifying ranges. If only one of the two is given, the other is minimum resp. maximum.

###### Examples:

* `resource?page=2` items 11 to 20
* `resource?page=2&size=50`items 51 to 100
* `resource?sort=price` ordered by price in ascending order (lowest first)
* `resource?sort=+price` same as above
* `resource?sort=-price` ordered by price in descending order (highest first)
* `resource?id=38fa21` item with id 38fa21
* `resource?name=Doe` all items with the value Doe as name
* `resource?email~=gmail` all items that contain gmail in the email property
* `resource?priceFrom=100` all items with a price >= 100
* `resource?priceTo=100` all items with a price <=100
* `resource?priceFrom=50&priceTo=100` all items with a price between 50 and 100

All combinations are possible.

## Resource Documentation

### Entry Point: [ec:datamanagers](id:datamanagers)
When accessing the Entry Point, the list of available data managers is returned.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of data managers.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager/by-id |Retrieves an individual data manager resource based on the specified identifier. |GET|Yes. Requires the dataManagerID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:datamanager` Resources.

#### POST ec:datamanagers
To create a new Data Manager Space, POST to the collection resource with the following template:

##### Properties
| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|

##### Output

* **201 created** if everything went well. The response is the new `ec:datamanager` resource.

### [Resource: ec:datamanager](id:datamanager)
A single Data Manager Space.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Data Manager Space.|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of Data Managers. Includes this Data Manager. |GET, POST|No.|
|ec:assets     |Collection of assets associated with this Data Manager Space. |GET, POST|No.|
|ec:assets/deleted|Collection of deleted assets associated with this Data Manager Space. |GET|No.|
|ec:customer   |The customer this Data Manager Space belongs to.| GET | No. |

##### Properties
| Name         | Description     |
|--------------|-----------------|
|dataManagerID |The unique identifier for this Data Manager Space as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|rights        |Array of available rights (`manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`). Not included rights are not available.
|created       |Timestamp of the creation of this Data Manager Space as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|

#### PUT ec:datamanager

*TBD!*

Title and description of the Data Manager can be changed, as well as rights.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|rights        |Array of rights (`manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`). 

##### Output

* **200 ok** if everything went well

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

### [Resource: ec:asset](id:asset)
A single asset.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Asset.|GET, PUT, POST, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of assets. Includes this asset. |GET, POST|No.|
|ec:datamanager|The Data Manager Space this asset belongs to. |GET,PUT |No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|assetID |The unique identifier for this asset as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Asset. Inferred from the original file name of the uploaded file.|
|type         |Asset type, one of `image`, `video`, `audio`, `generic`, `document`, `spreadsheet`
|created       |Timestamp of the creation of this asset as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|tags          |Array of string tags for this asset|
|files         |Array of actual files for this asset, containing `ec:asset/file` subresources.

#### Resource: ec:asset/file
This subresource is included in the ec:asset resource.

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


#### PUT ec:asset
To modify an asset, a PUT call is required containing the following properties as JSON body:

| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Asset. If omitted, no change is done.|
|tags          |Array of string tags for this asset. If the sent array is missing tags that were in the original resource, those will be deleted. Always send the complete list of tags. If the property is missing altogether, no tags will be added or deleted.|
|files         |Optional array of files. Include to change locale of single files (`ec:asset/file` resource properties `url` and `locale` are required). If included, all files have to be included in the array. Files not included will be deleted.

To merge two assets, include a link relation to another asset in a PUT request (HAL links list should contain an `ec:asset` link relation). The target asset(s) will be merged into this one, if possible. 


#### POST ec:asset
To add an additional representation to an asset resource (e.g. another image resolution or document localized for another locale), the new file is POSTed to the `ec:asset` resource with content type multipart/form-data ([RFC 2388](http://tools.ietf.org/html/rfc2388)). The field name has to be `file`.

##### Output

* **200 ok** if everything went well

#### DELETE ec:asset
To mark an asset for deletion, including its file representations, send a DELETE request to the `ec:asset` resource.

##### Output

* **204 no content** if everything went well

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

### [Resource: ec:models](id:models)

*tbd*

### *tbd*