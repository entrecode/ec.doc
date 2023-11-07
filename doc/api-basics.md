## API Basics

All entrecode APIs are *REST APIs,* or rather *Hypermedia APIs.* This means that the term *REST* is actually understood as [intended by Roy T. Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) – including the *Hypermedia Constraint.* See [this blog post](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) for a more in-depth description of REST and the difference to a simple HTTP-based API which is often mistakenly called *REST API.*

In short, data is partitioned in *resources* which manifest in *representations.* Those are transferred using a *standardized format* ([JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)) with *standardized methods* (HTTP/1.1, [RFC 7230](http://tools.ietf.org/html/rfc7230)). Application flow between resources is defined by link relations. URLs are subject to change and must not be hard coded. Instead, link relations can be used to explore and use the APIs.

## Available APIs

#### [Account Server API](./account_server/)

The account server handles user accounts, registration, authentication and authorization.

The **Entry Point** is [`https://accounts.entrecode.de/`](https://accounts.entrecode.de/), root relation: [ec:auth](./resources/auth/)

#### [Data Manager API](./data_manager/)

A Data Manager is a generated REST API with completely dynamic, configurable resources.
A user can, in general, have any number of Data Manager “Spaces”. The exact number may be limited by the customers plan. A single Data Manager Space manages Assets (Files) and Models with Entries (RESTful Resources).

The **Entry Point** is [`https://datamanager.entrecode.de/`](https://datamanager.entrecode.de/), root relation: [ec:datamanagers](./resources/datamanager/#list)

#### [App Manager API](./app_manager/)

The App Manager is a tool for configuring, building and deploying Apps. An App can have multiple platforms to run on.

The **Entry Point** is [`https://appserver.entrecode.de/`](https://appserver.entrecode.de/), root relation: [ec:apps](/resources/app/#list)

## Editor

The Front-End editor for Account Server, Data Manager and App Manager is live at 

**[e.entrecode.de](https://e.entrecode.de)**

## Authentication
Most API Calls require Authorization. 
The issued Authorization Token (`access_token`) has to be sent using the following HTTP Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
    
The token can also be sent via query string property `_token`.
    
The Access Token has to be acquired using the [Accounts API](./account_server/#authentication). It is a [JWT](https://tools.ietf.org/html/rfc7519).


## Relations
Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://entrecode.de/doc/rel/<relation>/<optional_subrelation>`. Those relations are also links to their own documentation. 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 


## Generic list resources
In general (i.e. unless stated otherwise), list resources support pagination, sorting and filtering.

##### Pagination:
Link relations `prev`, `next` and `first` SHOULD be used for pagination.
Internally, pagination is realized with the query string parameters `page` and `size`. 
`page` defaults to `1` and `size` defaults to `10`. To get *all* items of a list, you may specify `size=0`. Note that this may take considerable time on large resources, so us this function with care.

##### Sorting:
To sort by a different than the default property, the following query string parameter can be used: `sort={direction}{property}` where `direction` defaults to `+` (ascending order) and can be set to `-` (descending order).

##### Filtering:
**Exact Match:** A query string parameter of the form `{property}={value}` can be used for an exact-match filter. If used with an ID parameter, only one item will be returned and no list resource.

**Empty/Null:** A query string parameter of the form `{property}=` (empty value) can be used for an is empty / is null filter, where supported (PublicAPI).

**Not:** A query string parameter of the form `{property}!={value}`  can be used for an "is not exact match" filter, where supported (PublicAPI) - can also be combined with empty value for "not empty" filter.

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
* `resource?name!=Doe` all items with a name other than "Doe"
* `resource?name=` all items with no name
* `resource?name!=` all items with any name (not empty)
* `resource?email~=gmail` all items that contain gmail in the email property
* `resource?priceFrom=100` all items with a price >= 100
* `resource?priceTo=100` all items with a price <=100
* `resource?priceFrom=50&priceTo=100` all items with a price between 50 and 100
* `resource?tag=foo,bar` all items with the tag foo or bar
* `resource?tag=foo+bar` all items with the tags foo and bar

All combinations are possible.

## Cross-Origin Resource Sharing (CORS)

The [Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) usually prevents browsers from accessing remote APIs using XMLHTTPRequests (AJAX). This results in an error message like “No 'Access-Control-Allow-Origin' header is present on the requested resource.” and fails requests. To make our APIs accessable using Web Clients, we support [Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS). *And not the crude hack that is JSONP.* This means, we generally send the following HTTP Headers:

```
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Allow
```

Additionally, we send `Access-Control-Allow-Headers` with whatever is requested via `Access-Control-Request-Headers`.

*Preflight Requests* (HTTP OPTIONS calls) are responded to with an HTTP 200.

