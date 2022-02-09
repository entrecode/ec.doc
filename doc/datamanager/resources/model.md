## Single Model 

Model in a Data Manager. A model describes a resource available in the generated Data Manager API.

The JSON Schema is [https://entrecode.de/schema/model](https://entrecode.de/schema/model).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of this Model| No. Gets written on creation. |
|description    |String||Optional. A detailed description of this model.|Yes|
|fields | Array[JSON]  |[Field Definition](/data_manager/#field-data-types)|The fields for resources of this model.|Yes|
|hasEntries|Boolean||Indicates if entries exist.|No|
|hexColor|String|6-digit hex color `#rrggbb` `/^#[A-Fa-f0-9]{6}$/`|Color identifier for editor.|Yes|
|hooks|Array[JSON] |[Hook Definition](/data_manager/#hooks) | Hooks to perform when using the API | Yes|
|locales    |Array[String] | [RFC4646](https://tools.ietf.org/html/rfc4646) |JSON array with supported locales by this model. Like `de-DE` or `en-US`.| Yes |
|modelID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a model | No. Gets generated on creation. |
|modified| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the last modification of this Model| No. Gets written on modification. |
|policies|Array[JSON] |[Policy Definition](/data_manager/#permission-policies) | Permission Policies for the API | Yes|
|title  | String | a-z A-Z 0-9 _ - Maximum length 256 |The title of a model, unique in this data manager. Should be singular and lower case. |Yes|
|titleField | String|One of the fields|The field which should be used as title in editor frontend. Default: `id`|Yes|
||
|*deprecated:*|
||
|rights| JSON | Object with boolean keys: get, put, postPublic, postPrivate, delete |JSON object of available rights on this model | Yes |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Model](#)| The resource itself | GET, PUT |
| collection    | [Model List](#list)| List of all available Models | GET, POST|
| ec:model/purge| - | Attempts to delete all entries of the model, see [Purge](#puge) | DELETE |
| ec:model/entryHistory | [Entry Event List](#entry-event-list) | returns a list of events that happened to entries of this model. | GET |

## List

The Model List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Model Resources.


## Possible Actions

## Read

To read a single Model Resource, clients may perform GET on a `ec:model` relation.

To read the Modle List Resource, clients may perform GET on a `ec:models` relation or on the `collection` relation of a single Model resource.

In both cases, the success status code is **200 OK.**

Example:

```
{
    "modelID": "886aa7bb-a8f5-4164-8123-ae0e35bb9b35",
    "title": "recipe",
    "titleField": "name",
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
    ],
    "policies": [
        {
            "method": "get",
            "restrictToFields": [],
            "public": true,
            "roles": []
        },
        {
            "method": "post",
            "restrictRuleToFields": [],
            "public": false,
            "roles": ["14i1ord"]
        }
    ]
}
```

## Create

To create a new Model, clients may perform a POST on `ec:models` (the list resource). The JSON Schema for creating a new Model is [https://entrecode.de/schema/model-template](https://entrecode.de/schema/model-template). 

The success status code is **201 Created** and the response body is the newly created single Model resource.

## Edit

To update an existing Model Resource, clients may perform a PUT on `ec:model` or `self` at a single Model Resource. The JSON Schema for editing a Model is [https://entrecode.de/schema/model-template](https://entrecode.de/schema/model-template). 
All fields are optional. Some changes cannot be done when there are already entries (generated API resources).

The success status code is **200 OK** and the response body is the updated single Model resource.

## Delete

To delete a Model including all its data, clients may perform a DELETE on `ec:model` or `self` at a single Model Resource.

If the model is “mandatory” or still has entries, it cannot be deleted – delete the entries in the generated API first.

The success status code is **204 No Content** with an empty response body.

## Purge

To delete all entries of a Model, clients may perform a DELETE on `ec:model/purge` at a single Model Resource. Note that entries which are referenced as required somewhere else will not be deleted. Until now you need to find the referencing entry manually. This is subject to change.

The success status code is **204 No Content** or **202 Accepted** with an empty response body.

## Entry Event List

If the `ec:model/entryHistory` relation is output, the event history of this model's entries is available (otherwise the Data Manager History Service is not configured or currently offline). 

Following the link relation using GET returns an array of events (can be empty). To specify the number of events, you may set the `_size` property in the templated link. There are no more filter options available. The result JSON format is not fixed yet and may be subject to change.

> Note that the size of events can be quite big. It is **not** recommended to request more than 10-20 events! 

The permission `dm:<dataManagerID>:model:entries:<modelID>:history` is required to access entry events.

By default, the output media type is `application/json`. 
To support live updating, server-sent events are also supported. Clients may consume the event stream using the [EventSource API](https://developer.mozilla.org/en/docs/Web/API/EventSource) built into browsers. The URI is the same (sending an `Accept: text/event-stream` header triggers output of the stream instead of the JSON entry list).
Note that while some EventSource Client libraries support additional HTTP headers, the default API does not. Because of that, it is required to send the authentication token via query string parameter `_token` [as described](../#authentication) in those clients.
