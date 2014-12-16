# models 
Collection of models in a Data Manager.

* [GET](#get)   
* [POST](#post)

## GET
Get a list of all available models of a specified Data Manager.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/models](https://entrecode.de/schema/models)

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of models.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager|The data manager these models belong to.|GET,PUT|No.|
|ec:model/by-id |Retrieves an individual model resource based on the specified identifier. |GET|Yes. Requires the modelID.


#### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

#### Embedded

[ec:model](../model) Resources

### Error Response: 401 unauthorized
If the authentication header is missing or invalid, the following error response is triggered:

#### Headers
|Header|Value|
|------|-----|
|WWW-Authenticate|`Bearer`|

#### Body
An error object.



## POST
Create a new model. 

### Request

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

#### Body

JSON Schema: [https://entrecode.de/schema/model-template](https://entrecode.de/schema/model-template)

|Input field     |Description        |
|----------------|-------------------|
|title           |The Model title.
|rights          |Model rights.
|fields          |Model fields. Mandatory fields (with reserved titles) should not be included here


### Response: 201 created

The model was created successfully.

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