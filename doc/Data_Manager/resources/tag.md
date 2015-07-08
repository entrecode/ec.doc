# tag 
Tag in a Data Manager.

* [GET](#get)   
* [PUT](#put)
* [DELETE](#delete)

## GET
Get a single tag.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/tag](https://entrecode.de/schema/tag)

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode tag|GET, PUT, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of tags. Includes this tag.|GET|No.|


#### Properties
| Name         | Description     |
|--------------|-----------------|
|tag       		|The tag name.|
|count	   		|Number of occurences of this tag in the data manager.

#### Example

```
{
	"tag": "tagName",
	"count": 3,
	...
}
```

### Error Response: 401 unauthorized
If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.


## PUT
Edit a tag. 

### Request

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

#### Body

JSON Schema: [https://entrecode.de/schema/model-template](https://entrecode.de/schema/tag)

|Input field     |Description        |
|----------------|-------------------|
|tag             |The new tag name. Note that only lowercase characters, numbers and _ are allowed in tags.

### Response: 200 ok

The tag was changed successfully.

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

#### Body
An error object.



## DELETE
Delete a tag. 

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 204 ok

The tag was deleted successfully.

### Error Response: 401 unauthorized

If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.


# tags 
Collection of tags in a Data Manager.

* [GET](#get)

## GET
Get a list of all available tags of a specified Data Manager.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer <token>`|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/models](https://entrecode.de/schema/tags)

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of models.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager|The data manager these tags belong to.|GET,PUT|No.|

#### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

#### Embedded

[ec:tag](../tag) Resources

### Error Response: 401 unauthorized
If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.