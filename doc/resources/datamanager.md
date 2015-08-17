# datamanager
A single Data Manager Space.

* [GET](#get)
* [PUT](#put)
* [DELETE](#delete)

## GET
Show a single Data Manager.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/datamanager](https://entrecode.de/schema/datamanager)

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Data Manager Space.|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of Data Managers. Includes this Data Manager. |GET, POST|No.|
|ec:assets     |Collection of assets associated with this Data Manager Space. |GET, POST|No.|
|ec:assets/deleted|Collection of deleted assets associated with this Data Manager Space. |GET|No.|
|ec:models     |Collection of models associated with this Data Manager Space. |GET, POST|No.|
|ec:customer   |The customer this Data Manager Space belongs to.| GET | No. |

##### Properties
| Name         | Description     |
|--------------|-----------------|
|dataManagerID |The unique identifier for this Data Manager Space as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|config   		|A JSON object for various configurations (for future use).|
|hexColor      |A color to quickly identify a Data Manager Space in the frontend. Defaults to `#d23738`|
|rights        |Array of available rights (`manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`). Not included rights are not available.
|publicAssetRights|Array of available rights for public assets API (`get`, `put`, `postPrivate`, `postPublic`). Not included rights are not available.
|created       |Timestamp of the creation of this Data Manager Space as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|locales       |Array of available locales ([RFC4646](https://tools.ietf.org/html/rfc4646)) in this Data Manager Space.|
|defaultLocale |The default locale of this Data Manager Space. Included in `locales`.|

### Error Response: 401 unauthorized
If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.


## PUT
Title and description of the Data Manager can be changed. Locales can be added or deleted and a defaultLocale can be set.

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

#### Body
| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|config   	   	|A JSON object for various configurations (for future use).|
|locales       |Array of available locales ([RFC4646](https://tools.ietf.org/html/rfc4646)) in this Data Manager Space.|
|publicAssetRights|Array of available rights for public assets API (`get`, `put`, `postPrivate`, `postPublic`). Not included rights are not available.
|defaultLocale |The default locale of this Data Manager Space. Included in `locales`.|

### Response: 200 ok
The datamanager was successfully changed. Response body contains the datamanager.

### Error Response: 400 bad request

If the sent body is no JSON or not valid, the following error response is triggered:

#### Body
An error object.

### Error Response: 401 unauthorized

If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

### Response: 405 method not allowed
If the user has no right to edit this datamanager.

#### Body
An error object.

## DELETE
Delet a datamanager.

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

### Response: 204 no content
The datamanager was deleted.

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

Note that locales can not be set on creation, but are always set to the default (`en_US`).

##### Output

* **201 created** if everything went well. The response is the new `ec:datamanager` resource.
