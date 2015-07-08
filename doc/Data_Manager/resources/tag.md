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