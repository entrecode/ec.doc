
## Account Server Basics

This document describes the Hypermedia REST API of the entrecode Accounts API.

* **Entry Point:** [https://accounts.entrecode.de/](https://accounts.entrecode.de/)
* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))

### Authentication
Most API Calls require Authorization. 
The issued Authorization Token (`access_token`) has to be sent using the following HTTP Header:

    Authorization: Bearer AbCdEf1234567890
    
To acquire an access token, auth/register, auth/login for user credentials or auth/oauth for OAuth registration/login has to be called. See the Link Relation table of the Entry Point Resource for details.

### Relations
Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://entrecode.de/spec/rels/<relation>/<optional_subrelation>`. Those relations are also links to their own documentation. 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 

### Resources
* [Entry Point](#entry-point)
* [ec:accounts](#accounts) (Account Management)
    * [ec:account](#account)
        * [ec:account/tokens](#account-tokens)
            * [ec:account/token](#account-token)
        * [ec:account/change-email-verification](#account-change-email-verificaton)
* Authentication
    * [ec:auth/register](#auth-register)
    * [ec:auth/login](#auth-login)
    * [ec:auth/logout](#auth-logout)
    * [ec:auth/password-reset](#auth-password-reset)
    * [ec:auth/email-available](#auth-email-available)
    * [ec:auth/email-verification](#auth-email-verification)
    * [ec:auth/oauth](#auth-oauth)


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

All combinations are possible.
