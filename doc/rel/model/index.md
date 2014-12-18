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
|title         |The title of a model, unique in this data manager. Always singular and lower case.
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
|rights          |Optional. Can be used to change the model rights by setting the rights flags. Always include the full object.
|fields          |Optional. Can be used to change the fields. Always include the full object.

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