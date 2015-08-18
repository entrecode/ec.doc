# Data Manager Basics

This document describes the Hypermedia REST API of the entrecode Data Manager API.

* **Entry Point:** [https://datamanager.entrecode.de/](https://datamanager.entrecode.de/)
* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))

The root resource is [ec:datamanagers](https://entrecode.de/doc/rel/datamanagers).

See the [API Documentation](https://entrecode.de/doc/apidoc) for details.

# Model field type definitions

A field definition consists of the following properties:

| Key           | Value          | Examples
|---------------|----------------|-----------
|title          |Identifier of the field |`description`, `recipeIngredients`
|description    |Additional information about the purpose of this field for documentation. | `Lists ingredients of the recipe.`
|type           |The field type, a value as specified below  |`text`, `boolean`, `url`, `asset`
|readOnly       |Specifies if the field can be written with updates (or only at creation) | `true`, `false`
|required       |Specifies if the field always needs a value or can also be null | `true`, `false`
|unique         |Specifies if the value needs to be unique | `true`, `false`
|localizable    |Specifies if the field is localizable | `true`, `false`
|mutable        |Specifies if the field is mutable by the Data manager user, or provided by the system. | `true`, `false`
|validation     |Validation of field values. Can be a Regular Expression (`text` type), a JSON Schema (`object` type), a model or asset type, or an object with optional `min` and  `max` values (`number` and `decimal` types), depending on `type` (specified below) | `^\d{3}\w+$`, `{ "$ref": "#some-schema" }`, `{ "min": 0, "max": 100 }`

## Change field definition
If a model has no entries all properties can be changed if the field itself is marked `mutable`. But only some properties can be changed once a model has entries.

In the following table is specified if and how a property can be changed once it has entries:

| Key           | Allowed change          
|---------------|----------------
|title          | This results in the removal of the old field and creates a new field with the given title (Only allowed if required is `false`).
|description    | Every change.
|type           | only formattedText <> text
|readOnly       | Every change.
|required       | Only change to `false`.
|unique         | Only change to `false`.
|localizable    | Every change. Existing entries will have localized/unlocalized values.
|mutable        | None, since this value is set by the system.
|validation     | Only removed.

## Mandatory fields
Those fields are mandatory and included in all models by default. They cannot be deleted or otherwise modified (mutable = `false`).

### id (Type: `id`)
The `id` field is a unique identification for an entry and an own, non-reusable type.

### created (Type: `datetime`)
The timestamp of the creation of an entry. All date and time values are UTC in [RFC3339](https://tools.ietf.org/html/rfc3339) format.

### modified (Type: `datetime`)
The timestamp of the last modification of an entry. All date and time values are UTC in [RFC3339](https://tools.ietf.org/html/rfc3339) format.

### creator (Type: `entry`)
The user account that created this entry. If no account management is active (e.g. no visible account model exists), this field is not included.s

## Allowed field names

A field title may consist of up to 256 characters, but is limited to lowercase- and uppercase characters, digits, _ and -.
Field titles *should* only use lowercase characters and be singular (e.g. `article` instead of `articles`).
The following field names are reserved, since they are used internally by the system.

* id
* created
* modified
* creator
* page
* size
* sort
* private
* ending with "from"
* ending with "to"
* ending with "~"

## Types

### Primitive Types
These types are simple data types.

|Type|Description|Entry Structure|Validation|Sortable|Filterable|Example|
|----|-----------|---------------|----------|--------|----------|-------|
|text|A simple string value of any length. For common formats, better use [Convenience Types](#convenience-types).|String|Regular Expression|yes|exact, search|`"foo"`|
|formattedText|Same as `text` type, but for formatted text.|String|Regular Expression|yes|exact, search|`"foo"`|
|number|A signed integer number. Keep integer limits in mind.|Number|Object with `min` and/or `max` values|yes|exact, range|`7`|
|decimal|A floating point number. Keep precision limits in mind.|Number|Object with `min` and/or `max` values|yes|exact, range|`4.2`|
|boolean|A simple true/false flag.|Boolean|—|no|exact|`true`|

### Convenience Types
These types are more complex types with a specific domain that abstract from primitive types.

|Type|Description|Entry Structure|Validation|Sortable|Filterable|Example|
|----|-----------|---------------|----------|--------|----------|-------|
|id  |Unique identification for an entry. This is an own, non-resuable type.|String|—|no|exact|`"j4kd68fz"`|
|datetime|A date and/or time data type in [RFC3339](https://tools.ietf.org/html/rfc3339) format (always including Time Zone).|Date|—|yes|exact, range|`"2015-01-14T13:33:43.168Z"`|
|location|A latitude/longitude definition of a location. Uses the JSON schema [http://json-schema.org/geo](http://json-schema.org/geo)|JSON Object with keys `latitude` and `longitude`|—|no|exact, range <br/>(with values `lat,long`)|`{latitude: 48.774702, longitude: 9.1827263}`|
|email|A valid eMail address. Internally, [validator.js](https://github.com/chriso/validator.js) is used.|String|—|yes|exact, search|`"info@domain.com"`|
|url|A valid URL. Internally, [validator.js](https://github.com/chriso/validator.js) is used.|String|—|yes|exact, search|`"http://entrecode.de"`|
|phone|A valid Phone number according to [E.164](http://www.itu.int/rec/T-REC-E.164/en). Will automatically formatted in international format according to the default locale of the current Data Manager with [libphonenumber](https://github.com/googlei18n/libphonenumber) |String|—|yes|exact, search|`"+49711832468234"`|
|json|A generic JSON object. |JSON Object|A valid [JSON Schema](https://tools.ietf.org/html/draft-kelly-json-hal-06)|no|—|`{key: "value"}`|


### Linked Types
|Type|Description|Entry Structure|Validation|Sortable|Filterable|Example|
|----|-----------|---------------|----------|--------|----------|-------|
|entry|Link to a single entry that is related to this one.|String (`entry.id`)|A model to enforce a specific entry type|—|exact|`"49a8f3b4"`|
|entries|Link to entries that are related to this one.|Array<br/>(of `entry.id` Strings)|A model to enforce a specific entry type|—|search<br/>(single id that is included)|`["8fa398d2","49a8f3b4"]`|
|asset|Link to a single asset that is related to this entry.|String (`asset.assetID`)|An asset type to enforce a specific type|—|exact|`"a8c44bd8-d225-433b-94e4-20fd38ea2d8f"`|
|assets|Link to assets that are related to this one.|Array<br/>(of `asset.assetID` Strings)|An asset type to enforce a specific type|—|search<br/>(single id that is included)|`["371393a6-ab7f-4591-8d5d-54261a52d28b","a8c44bd8-d225-433b-94e4-20fd38ea2d8f"]`|


# Assets in the Public API (aka. getBestFile)
Assets have a file-independent URL (consisting of the asset ID). Calling it returns the best fitting file, depending on the requested Locale (Accept-Language header).
Image resources also support requesting a specific size: The query string parameter `size` can be used to specify the size in pixels the largest edge should have at least. Note that if the image is smaller than that, the largest possible image is returned (but possibly smaller than `size`). To request thumbnail sizes (thumbnails are square-cropped images of size 50, 100, 200, 400px), send the parameter `thumb` with the request. If you do not want the file directly you cann add `/url` to the request and you will get a JSON with a field `url` containing the url of the file you would have received.

Examples:

```
https:/datamanager.entrecode.de/files/:assetID/:url?{?size,thumb}
```
general description of the best file route.

```
https:/datamanager.entrecode.de/files/853a931b-2091-4f92-acad-cd0c0e6fedbc?size=100&thumb
```

will get the thumbnail `file` for the asset with `size` 100.

```
https:/datamanager.entrecode.de/files/853a931b-2091-4f92-acad-cd0c0e6fedbc/url?size=100
```

will get the `url` for the asset with `size` 100.


Additionally there is a API for public assets similar to the `ec:asset[s]`. Please refere to the public documentation found in any data manager in editor.

# User Management in Data Managers
In every Data Manager there is a predefined and mandatory model `user`. It holds only the mandatory fields stated above. The Data Manager user can add additional fields to the user model, e.g. for a user name, eMail address or billing information.

Additionally the `user` model contains the following field:

### temporaryToken (Type: `text`)
The `temporaryToken` field is a version 4 UUID and contains the temporary access token for the user.

Client-side users of Data Manager APIs will need to POST a `user` entry before they can proceed. Refer to the automatically generated documentation for POST model `user`. This entry will be used for setting the `creator` field when creating an entry of any model. It is also used to authorize any change to an existing entry.

For users without credentials the `temporaryToken` of the user entry is used as access token with 99 years validity. This token will be deleted and replaced by an actual one once user management (see below) is activated and the user provides credentials.

*__The following is functionality of the future. Until now only the anonymous users are implemented.__*

Additionally to the `user` model, a Data Manager user can activate user management for a Data Manager (if the booked plans allows that). This means that the model `user` will be extended with `eMail` and `password` (read: passwordHash and salt; wow. such secure. much awesome.). Then client-side users can register with eMail and password. Login/Logout, basic session management and password reset are available. More detailed documentation will follow when implemented.


# Hooks
Hooks can be used to add additional functionality to models. E.g. they enable you to alter values before saving or to pass data on to another server.

A hook is always enabled on a per-model basis and can be triggered either before or after processing the request. A before-hook is able to transform the request (and e.g. alter values before saving them). An after-hook can be used to for example communicate the creation of an entry to another server. Hooks can be set up for all four standard HTTP methods (GET, PUT, POST, DELETE).

Hooks are defined in the `hooks` property of a model. It is always a JSON Array. There can be an arbitrary number of hooks for a model. If two hooks are configured for the same trigger point (e.g. 'before put'), they are triggered in the order they are listed in the `hooks` array.

There are different types of hooks that each have their own necessary configuration.
Hooks are normally asynchronous. This means, the normal Data Manager execution is not influenced by the hook and not delayed. If a hook throws an error (e.g. a remote web server could not be reached), this does not influence the data manager request. However, “before” hooks can optionally be synchronous. This enables transformation of requests.

Example JSON:

```js
[
    {
        "hook": "after", // 'before' or 'after'
        "type": "web", // a valid type
        "methods": ["post"], // 'get', 'put', 'post' or 'delete'
        "description": "my test hook" // optional. Makes the hook identifiable in logs etc.
        "config": {
            // type specific
        }
    },
    {
    // another hook. If it has the same signature ('after' 'post'), it will be executed after the first one.
    }
]
```

## Web Hook
The web hook sends data to another server via HTTP/HTTPS.

Multiple targets can be set, so it is possible to notify multiple servers. Each target can be configured with an URI, the HTTP method to use and optional custom header fields.

The payload is by default a JSON object containing all available information about the request:

```js
{
    "request": {
        "method": "put",
        "uri": "https://datamanager.entrecode.de/beef1337/mymodel?myfield=filtered",
        "body": {
            "myfield": "newValue"
        },
        "headers": {
            "my-custom-header": "my custom header value"
        }
    },
    "response": { // the response property is only available if it is an 'after' hook.
        "status": 200,
        "body": {
            "count": 1,
            "total": 1,
            "_links": {
                // ... HAL links
            },
            "_embedded": {
                "beef1337:mymodel": {
                    "id": "l231ij4",
                    "myfield":"newValue"
                    // ... full response
                }
            }
        }
    }
}
```
However, this result object can be transformed to only send the required information.
There are two transformation methods available:

#### [JSON-Mask](https://github.com/nemtsov/json-mask) 
A language to mask specific parts of a JSON object, hiding the rest. For example, to only pass on the request body, the following JSON mask would be used: 

`request/body`

To only pass on the request method/uri and the response status, the following JSON mask would be used:

`request(method,uri),response/status`

JSON-Mask does not alter the structure of the JSON, it just hides specific parts of it. This means, that the data will always have the `request`/`response` root level properties. To get rid of those, you can additionally use the second transformation method:

#### [JSONPath](https://github.com/dchester/jsonpath)

JSONPath can be used to query JSON objects similar to XPath for XML. It returns an array of “matches” and works similar to CSS and JQuery selectors. To only return the actual request body, the following JSONPath expression would be used:

`$.request.body`

It also lets you get a response body without the HAL container:

`$.response.body._embedded['beef1337:mymodel']`

Arrays may even be filtered with [JSONPath syntax](https://github.com/dchester/jsonpath#jsonpath-syntax).

Note that JSONPath always returns an array of “matched” objects. With an optional flag you can instead return the first array element (note that this will always return a single object, even if the JSONPath result array contains more than one).



### Web hook configuration

The following example is a complete web hook configuration:

```js
[
    {
        "hook": "after",
        "type": "web",
        "methods": ["put"],
        "description": "send updated entry",
        "config": {
            "targets": [
                {
                    "uri": "https://my-other-server/endpoint",
                    "headers": {
                        "Authorization": "Bearer 1o32iru1oi3rj",
                    },
                    "method": "post"
                }
            ],
            "request": {
                "__jsonmask": "response/body/_embedded/*(id,property1,property2)", 
                "__jsonpath": "$.response.body._embedded['beef1337:mymodel']",
                "__array": false
            },
            "querystring": {
                "remoteID": {
                    "__jsonpath": "$.response.body._embedded['beef1337:mymodel'].id"
                    "__array": false
                }
            }
        }
    }
]
```
It sends the `id`, `property1` and `property2` values of the edited entry to `https://my-other-server/endpoint?remoteID=l231ij4`.

The request body for the hook is fully configurable JSON. The three “magic” properties `__jsonmask`, `__jsonpath` and `__array` can be used to insert the actual content of the response, even at multiple sections in the json. The `request` property is to be understood as a request body template for the remote call.
The `querystring` property works the same way. Note that only root level properties can be converted to a query string.

A “before” web hook can also be synchronous:

```js
{
    "hook": "before",
    "type": "web",
    "methods": ["put"],
    "description": "external validation",
    "config": {
        "targets": [
            {
                "uri": "https://my-other-server/endpoint",
                "headers": {
                    "Authorization": "Bearer 1o32iru1oi3rj",
                },
                "method": "post"
            }
        ],
        "request": {
            "__jsonmask": "response/body/_embedded/*(id,property1,property2)", 
            "__jsonpath": "$.response.body._embedded['beef1337:mymodel']",
            "__array": false,
        "validate": {
            "status": 200,
            "replaceBody": true
            "responseMapping": {
                "property1": {
                    "__jsonpath": "$.resultobject.property1"
                    "__array": false
                },
                "property2": "hard coded" 
            }
        }
    }
}
```

The `validate` property (which is only effective in “before” hooks) can be configured to expect a certain HTTP status of the remote server, in this case the request is only executed if the remote server answers with HTTP status 200. If the target server(s) respond with another status code, the data manager request is rejected with an error. An optional error response of the validating server is sent back to the data manager client. 

The `replaceBody` flag can be used to swap the actual request body with the response body of the remote server, making it possible to transform the request. It is also validated afterwards, so the remote server is forced to send valid data. *coming soon!*

It is also possible to map the server response, if it is not in a valid Data Manager Request format. This can be done by providing the `responseMapping` property with a template similar to the request template, using JSON-Mask and JSONPath. Properties can also get hardcoded values. Properties not written remain at the value provided by the original request. *coming soon!*





# Data Manager Model Field Data Types

This document describes the Data Types available for Model Fields.

- **[Primitive Types](#primitive-types)**
    - [Text](#text)
    - [Number](#number)
    - [Decimal](#decimal)
    - [Boolean](#boolean)
- **[Convenience Types](#convenience-types)**
    - [ID](#id)
    - [DateTime](#datetime)
    - [Location](#location)
    - [eMail](#email)
    - [URL](#url)
    - [Phone](#phone)
    - [JSON](#json)
- **[Linked Types](#linked-types)**
    - [Entry](#entry)
    - [Entries](#entries)
    - [Asset](#asset)
    - [Assets](#assets)

# Primitive Types

## Text
A simple string value of any length. For common formats, better use [Convenience Types](#convenience-types]).

## Number
A signed integer number. Keep integer limits in mind.

## Decimal
A floating point number. Keep precision limits in mind.

## Boolean
A simple true/false flag.

# Convenience Types
These types are more complex types with a specific domain that abstract from primitive types.

## ID
Unique identification for an entry. This is an own, non-resuable type.

## DateTime
A date and/or time data type in [RFC3339](https://tools.ietf.org/html/rfc3339) format (always including Time Zone).

## Location
A latitude/longitude definition of a location. Uses the JSON schema [http://json-schema.org/geo](http://json-schema.org/geo).
Is represented as a JSON Object with keys `latitude` and `longitude`.

## eMail
A valid eMail address.

## URL
A valid URL. 

## Phone
A valid Phone number according to [E.164](http://www.itu.int/rec/T-REC-E.164/en). Will automatically formatted in international format according to the default locale of the Data Manager.

##JSON 
A generic JSON object.


# Linked Types

## Entry
Link to a single entry that is related to this one.

## Entries
Link to entries that are related to this one.

## Asset
Link to a single asset that is related to this entry.

## Assets
Link to assets that are related to this one.





# Link Relations

Additional to the official link relations defined by [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml) and the relations documented in [API Documentation](../rel), entrecode uses the following:

| Link Relation                 | Description                                    |
|-------------------------------|------------------------------------------------|
|[asset](./asset)           |A Data Manager Asset|
|[asset/file](./asset/file) |File of a Data Manager Asset|
|[assets](./assets)         |List of Data Manager Assets|
