# entrecode API Documentation

This document describes the Hypermedia REST APIs of the entrecode Systems.

All entrecode APIs are *REST APIs,* or rather *Hypermedia APIs.* This means that the term *REST* is actually understood as [intended by Roy T. Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) – including the *Hypermedia Constraint.* See [this blog post](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) for a more in-depth description of REST and the difference to a simple HTTP-based API which is often mistakenly called *REST API.*

In short, data is partitioned in *resources* which manifest in *representations.* Those are transferred using a *standardized format* ([JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)) with *standardized methods* (HTTP/1.1, [RFC 7230](http://tools.ietf.org/html/rfc7230)). Application flow between resources is defined by link relations. URLs are subject to change and must not be hard coded. Instead, link relations can be used to explore and use the APIs.

# Available APIs

#### [Account Server API](./account_server/)

The account server handles user accounts, registration, authentication and authorization.

The **Entry Point** is [`https://accounts.entrecode.de/`](https://accounts.entrecode.de/), root relation: [ec:auth](./resources/auth/)

#### [Data Manager API](./data_manager/)

A user can, in general, have any number of Data Manager “Spaces”. The exact number may be limited by the customers plan. A single Data Manager Space manages Assets (Files) and Models with Entries (RESTful Resources).

The **Entry Point** is [`https://datamanager.entrecode.de/`](https://datamanager.entrecode.de/), root relation: [ec:datamanagers](./resources/datamanager/#list)

#### [App Manager API](./app_manager/)

The App Manager is a technical tool for configuring, building and deploying Apps. An App can have multiple platforms to run on.

The **Entry Point** is [`https://appserver.entrecode.de/`](https://appserver.entrecode.de/), root relation: [ec:apps](/resources/app/#list)

## Editor

The Front-End editor for Account Server, Data Manager and App Manager is live at 

**[editor.entrecode.de](https://editor.entrecode.de)**

# Authentication
Most API Calls require Authorization. 
The issued Authorization Token (`access_token`) has to be sent using the following HTTP Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
    
The Access Token has to be acquired using the [Accounts API](./account_server/#authentication). It is a [JWT](https://tools.ietf.org/html/rfc7519).


# Relations
Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://entrecode.de/doc/rel/<relation>/<optional_subrelation>`. Those relations are also links to their own documentation. 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 


# Generic list resources
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

**Multiple-Exact-Match:** A parameter with multiple values can be filtered for exact match of all or any of a number of given values. `{property}={value1},{value2}` matches all resources where one of the two values is matched. `{property}={value1}+{value2}` matches all resources where both of the two values are matched. Note that properties with this functionality must not have values that contain `,`, `+` or ` ` (Space) characters.

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
* `resource?tag=foo,bar` all items with the tag foo or bar
* `resource?tag=foo+bar` all items with the tags foo and bar

All combinations are possible.

# Cross-Origin Resource Sharing (CORS)

The [Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) usually prevents browsers from accessing remote APIs using XMLHTTPRequests (AJAX). This results in an error message like “No 'Access-Control-Allow-Origin' header is present on the requested resource.” and fails requests. To make our APIs accessable using Web Clients, we support [Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS). *And not the crude hack that is JSONP.* This means, we generally send the following HTTP Headers:

```
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Allow
```

Additionally, we send `Access-Control-Allow-Headers` with whatever is requested via `Access-Control-Request-Headers`.

*Preflight Requests* (HTTP OPTIONS calls) are responded to with an HTTP 200.

# Errors

Error responses across all APIs are always returned with an HTTP status code ≥ 400, i.e. 400, 401, 403, 404, 429, 500.
The media type is `application/problem+json`. Error responses comply to the [Problem Details IETF Draft](http://tools.ietf.org/html/draft-nottingham-http-problem-07) *and* to [HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06).
 
JSON Schema: [https://entrecode.de/schema/error](https://entrecode.de/schema/error)

The following properties are REQUIRED:
 
* `status` is the HTTP status code of the error and the same status code as the actual HTTP response
* `code` is a four digit error code as defined below
* `title` is the generic, short description of the error code
* `type` is the URL to the description of the error code
* `_links` is a HAL link object that includes `up` and `describedby` link relations; `describedby` is the same URL as `type`.
 
The following properties are OPTIONAL:
 
* `detail` is the name of the object the error occurred on (e.g. the invalid property)
* `verbose` any additional information about the error
* `_embedded` is a HAL embed object that MAY include `error` sub-resources.
 
Error sub-resources can be used to indicate more errors that occurred or would have occurred, if the enclosing *main* error would not have occurred.
Error sub-resources have a subset of the properties described above: `code`, `title`, `type` and `detail`.

### Example

    {
        "status": 400,
        "code": 2202,        
        "title": "Missing property in query string",
        "type": "https://entrecode.de/doc/errors/2202",
        "detail": "count",
        "_links": {
            "up": {
                "title": "Data Manager Home Page",
                "href": "https://datamanager.entrecode.de" 
            },
            "describedby": {
                "title": "Error Description",
                "href": "https://entrecode.de/doc/errors/2202"
            }
        }
        "_embedded": {
            "error": {
                "code": 2201,
                "title": "Missing property in JSON Body",
                "type": "https://entrecode.de/doc/errors/2201",
                "detail": "property"
            }
        }
    }
    
    

## Error Codes
Error codes are 4 digit decimal codes.
They consist of two parts. The first number identifies the system the error occurred in, the last three numbers identify the error, they are the actual error codes.
Examples:

**2100:** A requested resource in the Datamanager does not exist.

**2202:** A request to a resource in the Datamanager misses a required property in its query string. The detail field of the error response will indicate which property.

**3000:** An internal error occurred in the Appserver, probably a server-side bug.
 
 
### First Number: System
 
|Code|System|
|---|---|
| 1xxx | Account Server |
| 2xxx | Data Manager |
| 3xxx | App Manager |
 
More Codes may be added in the future.
 
### Second Number: Error Code

The actual error code (`code`) is partitioned in error types (bold in the table below).
The `detail` field includes further information about the subject of the error.
The `verbose` field may be used for further information what is actually wrong with the subject in `detail`.
 
| Code | Description | Detail | Verbose | HTTP Status Code |
|--------|------|------|------|-----|
| **000** | **Internal Error.** No further information disclosured to client. | | | 500 |
| **1xx** | **Generic Error** | | | |
| 100  <a name="error-100"></a>  | Resource not found |  |  | 404|
| 101  <a name="error-101"></a>  | No resource entity matching body property filter found | the body property that did not produce a match |  | 404|
| 102  <a name="error-102"></a>  | No resource entity matching query string filter found | the query string property that did not produce a match |  | 404|
| 110  <a name="error-110"></a>  | Method not allowed | the request method that is not allowed | | 405 |
| **2xx** | **Syntax Error** |  |  | |
| 200  <a name="error-200"></a>  | Missing body |  |  | 400|
| 201  <a name="error-201"></a>  | Missing property in JSON body | the property that is missing |  | 400|
| 202  <a name="error-202"></a>  | Missing property in query string | the property that is missing |  | 400|
| 203  <a name="error-203"></a>  | Missing file in upload | | | 400 |
| 204  <a name="error-204"></a>| Missing HAL link or embed in JSON body | the relation that is missing |  | 400|
| 211  <a name="error-211"></a>  | Invalid format for property in JSON body | the property with an invalid format |  | 400|
| 212  <a name="error-212"></a>  | Invalid format for property in query string | the property with an invalid format |  | 400|
| 213  <a name="error-213"></a>  | Invalid file format in upload | the recognized mime type that is not allowed | | 400|
| 214  <a name="error-214"></a>| Invalid linked or embedded HAL resource in JSON body, or link not found | the relation that is invalid |  | 400|
| 215  <a name="error-215"></a>  | Resource cannot be sorted after given property | the property that is not allowed for sorting |  | 400|
| 216  <a name="error-216"></a>  | Resource cannot be filtered with given property | the property that is not allowed for filtering |  | 400|
| 217  <a name="error-217"></a>  | Resource cannot be range-filtered with given property | the property that is not comparable |  | 400|
| 251  <a name="error-251"></a>  | Password is too short (on registration, only 1251 is defined) |  |  | 400|
| 252  <a name="error-252"></a>  | Unmatched validation error | TinyValidator4 Error Code with message |  | 400|
| 253  <a name="error-253"></a>  | Invalid asset to merge |  |  | 400 |
| 254  <a name="error-254"></a>  | Exceeded maximum levels for nested request. | Number of maximum levels |  | 400 |
| 255  <a name="error-255"></a>  | Could not get nested resources. | entryID which produced the error |  | 400 |
| 256  <a name="error-256"></a>  | Could not create download file. | detailed error response |  | 400 |
| **3xx** | **Semantics Error** |  |  | |
| 311  <a name="error-311"></a>| Invalid value for property in JSON body | the property with an invalid value | | 400 |
| 351  <a name="error-351"></a>  | eMail address is unavailable (on registration and email change, only 1351 is defined) |  |  | 403|
| 352  <a name="error-352"></a>  | Cannot delete openID connection (only 1352 is defined) |  |  | 403|
| 353  <a name="error-353"></a>  | Duplicate model name in same data manager (only 2352 is defined) |  |  | 403|
| 354  <a name="error-354"></a>  | Cannot delete Model, has entries (only 2354 is defined)|  |  | 403|
| 355  <a name="error-355"></a>  | Cannot delete Model, mandatory model (only 2355 is defined)|  |  | 403|
| 356  <a name="error-356"></a>  | Cannot change Model, has Entries. (only 2356 is defined) | More detailed description of error | Affected Field | 403|
| 357  <a name="error-357"></a>  | Model must support default locale (only 2357 is defined)| Affected modelID |  | 400|
| 358  <a name="error-358"></a>  | Unsupported locale (only 2358 is defined)| Affected modelID |  | 400|
| 359  <a name="error-359"></a>  | Violates unique constraint (only 2359 is defined)| title of violating field  |  | 400|
| 360  <a name="error-360"></a>  | Cannot delete entry. Referenced as required. (only 2360 is defined)| entryID holding the reference |  | 400|
| 361  <a name="error-361"></a>  | Cannot change entry. Read Only. (only 2361 is defined)| | | 403|
| 362  <a name="error-362"></a>  | Cannot change entry. Reference not found. (only 2362 is defined) | | | 400|
| 363  <a name="error-363"></a>  | Cannot change Model, edit of mandatory/unmutable field. (only 2363 is defined) | More detailed description of error | Affected field | 403|
| 364  <a name="error-364"></a>  | Cannot change Model, reserved field title. (only 2364 is defined) | Field title | | 400|
| 365  <a name="error-365"></a>  | Cannot change Model, duplicate model title. (only 2365 is defined) | Model title | | 400|
| 366  <a name="error-366"></a>  | Duplicate field name in model. | Field title | | 400 |
| 367  <a name="error-367"></a>  | Field cannot be unique and localizable. | Field title | | 400 |
| 368  <a name="error-368"></a>| Field of type boolean must be required. | Field title | | 400 |
| 369  <a name="error-369"></a>  | Title field not a field in the model. | Title field | | 400 |
| 370  <a name="error-370"></a>  | Cannot delete Resource. Is used. | | | 403 |
| **4xx** | **Rights Management Error** |  |  | |
| 400  <a name="error-400"></a>  | Missing Access Token |  |  | 401|
| 401  <a name="error-401"></a>  | Invalid Access Token |  |  | 401|
| 402  <a name="error-402"></a>  | Outdated Access Token |  |  | 401|
| 403  <a name="error-403"></a>  | Invalid Password | the email address that attempted the login | Timestamp until login is locked for this email address | 401|
| 404  <a name="error-404"></a>  | Account not found (unknown email address) |  |  | 404|
| 410  <a name="error-410"></a>  | Insufficient rights to access the requested resource |  |  | 401|
| 411  <a name="error-411"></a>  | Insufficient rights to access the requested resource with this method |  |  | 405|
| 444  <a name="error-444"></a>  | Denied because of stupidity |  |  | 403|
| 451  <a name="error-451"></a>  | Too many wrong login attempts (on login, only 1451 is defined) |  |  | 429|
| 452  <a name="error-452"></a>  | User blocked (on login and internal account API, only 1452 is defined) |  |  | 403|
| 453  <a name="error-453"></a>  | Invalid invite (on registration, only 1453 is defined) |  |  | 403|
| 460  <a name="error-460"></a>  | Generic OAuth Error | | more information | 400 |
| 461  <a name="error-461"></a>  | Facebook OAuth Request failed | Facebook Error Code | Facebook Error Message | 400|
| 462  <a name="error-462"></a>  | Facebook API call failed to receive eMail address | | more verbose Error Message | 400|
| 470  <a name="error-470"></a>  | Target resource does not fulfill permission policy conditions | | | 403 |
| 471  <a name="error-471"></a>  | Property cannot be written due to permission policy restrictions | the property that is not allowed | | 403 |
| **5xx** | Plan error (not in Accountserver, only 25xx and 35xx are defined) |  |  | |
| 500  <a name="error-500"></a>  | Missing plan for this product | the product that is not included in the current plan |  | 403|
| 510  <a name="error-510"></a>  | Insufficient plan for this product | the product whose limit is exceeded in the current plan |  | 403|
| 511  <a name="error-511"></a>  | Insufficient plan for creation | the product whose limit is exceeded in the current plan |  | 403|
| **9xx** | **Other** |  |  | |
 
 
---
###*Guidelines for definition of new error codes*##
* *a suitable HTTP error code should still be used*
* *codes should be added to the defined error types (1xx-5xx)*
* *codes are logically sub-partitioned in groups of ten*
* *codes above x5x should be used for very (resource- or system-)specific errors*

