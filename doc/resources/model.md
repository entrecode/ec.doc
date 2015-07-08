# model 
Model in a Data Manager. A model describes a resource available in Data Manager APIs.

* [GET](#get)   
* [PUT](#put)

## GET
Get a single model specification.

### Request

#### Headers
|Header|Value|
|------|-----|
|Authorization|`Bearer `token|

### Response: 200 ok

JSON Schema: [https://entrecode.de/schema/model](https://entrecode.de/schema/model)

#### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode model|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of models. Includes this model.|GET, POST|No.|


#### Properties
| Name         | Description     |
|--------------|-----------------|
|modelID       |The unique identifier for a model as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |The title of a model, unique in this data manager. Should be singular and lower case. Must only use a-z, A-Z, 0-9, _, -. Maximum length 256.
|description	|Optional. A detailed description of this model.
|rights        |JSON object of available rights on this model (Object with boolean keys: get, put, postPublic, postPrivate, delete)
|fields        |JSON array with field definition objects
|locales	   |JSON array with supportet locales by this model. Like `de-DE` or `en-US`.

#### Example

```
{
    "modelID": "886aa7bb-a8f5-4164-8123-ae0e35bb9b35",
    "title": "recipe",
    "rights": {
        "get": true,
        "put": true,
        "postPublic": true,
        "postPrivate": false,
        "delete": false
    },
    "locales": [
    	"en-US",
    	"de-DE"
    ],
    "fields": [
        {
            "title": "id",
            "description": "",
            "type": "id",
            "readOnly": true,
            "required": true,
            "unique": true,
            "localizable": false,
            "mutable": false,
            "validation": null
        },
        {
            "title": "created",
            "description": "",
            "type": "datetime",
            "readOnly": true,
            "required": true,
            "unique": false,
            "localizable": false,
            "mutable": false,
            "validation": null
        },
        {
            "title": "modified",
            "description": "",
            "type": "datetime",
            "readOnly": true,
            "required": true,
            "unique": false,
            "localizable": false,
            "mutable": false,
            "validation": null
        },
        {
            "title": "creator",
            "description": "",
            "type": "entry",
            "readOnly": true,
            "required": true,
            "unique": false,
            "localizable": false,
            "mutable": false,
            "validation": "account"
        },
        {
            "title": "name",
            "description": "",
            "type": "title",
            "readOnly": false,
            "required": true,
            "unique": false,
            "localizable": true,
            "mutable": true,
            "validation": "^[A-Z]\w*$"
        },
        {
            "title": "website",
            "description": "",
            "type": "url",
            "readOnly": false,
            "required": false,
            "unique": false,
            "localizable": true,
            "mutable": true,
            "validation": null
        },
        ...
    ]
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
Edit a model. 

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
|title           |Optional. Can be used to change the model title.
|description		|Optional. Can be used to change the model description.
|rights          |Optional. Can be used to change the model rights by setting the rights flags. Always include the full object.
|fields          |Optional. Can be used to change the fields. Always include the full object.
|locales		| Optional. Can be uesed to change the supported locales of this model.

### Response: 200 ok

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

## DELETE
Delete a model.

### Request

#### Headers
|Header|Value|
|------|-----|
|Content-Type|`application/json`|
|Authorization|`Bearer `token|

### Response: 204 ok
The model was successfully deleted.

### Error Response: 403 forbidden

If the model could not be deleted. Either has entries or is mandatory model.

#### Body
An error object.


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
