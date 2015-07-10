

This document describes the Hypermedia REST APIs of the entrecode Systems.

## Available APIs

### Account Server API

The account server handles user accounts, registration, authentication and authorization.

The **Entry Point** is [`https://accounts.angus.entrecode.de/`](https://accounts.angus.entrecode.de/), root relation: [ec:auth](https://entrecode.de/doc/rel/auth)

### Data Manager API

A user can, in general, have any number of Data Manager “Spaces”. The exact number may be limited by the customers plan. A single Data Manager Space manages Assets (Files) and Models with Entries (RESTful Resources).

The **Entry Point** is [`https://datamanager.angus.entrecode.de/`](https://datamanager.angus.entrecode.de/), root relation: [ec:datamanagers](https://entrecode.de/doc/rel/datamanagers)

## Basics

All entrecode APIs are *REST APIs,* or rather *Hypermedia APIs.* This means that the term *REST* is actually understood as [intended by Roy T. Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) – including the *Hypermedia Constraint.* See [this blog post](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) for a more in-depth description of REST and the difference to a simple HTTP-based API which is often mistakenly called *REST API.*

In short, data is partitioned in *resources* which manifest in *representations.* Those are transferred using a *standardized format* ([JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)) with *standardized methods* (HTTP/1.1, [RFC 7230](http://tools.ietf.org/html/rfc7230)). Application flow between resources is defined by link relations. URLs are subject to change and must not be hard coded. Instead, link relations can be used to explore and use the APIs.

* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))
* **[Richardson](http://martinfowler.com/articles/richardsonMaturityModel.html) Maturity Level:** 3 (full Hypermedia)


### Authentication
Most API Calls require Authorization. 
The issued Authorization Token (`access_token`) has to be sent using the following HTTP Header:

    Authorization: Bearer AbCdEf1234567890
    
The Access Token has to be acquired using the [Accounts API](https://accounts.entrecode.de). 


### Relations
Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://entrecode.de/doc/rel/<relation>/<optional_subrelation>`. Those relations are also links to their own documentation. 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 


### Generic list resources
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
