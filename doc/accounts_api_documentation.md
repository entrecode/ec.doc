# Accounts API Documentation

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



### [Entry Point Resource](id:entry-point)
When accessing the Entry Point, the following resource is returned containing links to available sub resources.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |The Entry Point itself.|GET    |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:accounts      |Collection of accounts. Only included for privileged users.|GET|No.|
|ec:account       |The single account of the logged in user.|GET|No.|
|ec:auth/register |Used to register a new account using credentials.|POST|No.|
|ec:auth/login    |Used to login using credentials|POST|No.|
|ec:auth/logout   |Used to logout a logged in user|POST|No.|
|ec:auth/password-reset|Used to send an email in case a user forgot her credentials|POST, PUT, DELETE|Yes. Requires the eMail and optional token.|
|ec:auth/email-available|Used to determine if an email address is still available for registration.|GET |Yes. Requires the eMail address to check.|
|ec:auth/email-verification|Used to tell the API Server that an eMail token verification link was openend.|POST|No.|
|ec:auth/oauth    |Used to login and/or register using an OAuth Provider|POST|No.|
|ec:account/change-email-verification     |Used to abort/verify an eMail change. (Created with PUT account)|PUT, DELETE|YES. Token of this verification.|

##### Properties

If a valid access token is sent with the request (i.e. a user is logged in), the following status information is included with the response:

| Property     | Description     | 
|--------------|-----------------|
|language       |(optional) The primary UI language for the logged in account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |(optional) The account state, one of `active`, `inactive`, `blocked`
|userRole       |(optional) The user role of the logged in user, one of `user` or `princess`
|validUntil     |(optional) Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

## Account Management

Provides access to a user's account settings, issued access tokens and similar information.

### [Resource: accounts](id:accounts)
List of accounts. Only accessible as privileged user.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of accounts.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:account/by-id |Retrieves an individual account resource based on the specified identifier. |GET|Yes. Requires the accountID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
account Resources with the properties `accountID`, `created`, `email`, `language`, `state`, `isPrincess`

*To also retrieve the `hasPassword` and `openID` fields, follow the `self` link to access the full resource.*

### [Resource: account](id:account)
A single entrecode Account.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Account|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:account/tokens|Collection of access tokens for this account|GET|No.|
|collection    |Collection of accounts. Includes this account. Only included if user is princess.|GET|No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|accountID     |The unique identifier for an account as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).
|created       |Date (UTC) of creation of this account in [RFC3339](https://tools.ietf.org/html/rfc3339) format.
|email         |The primary eMail address of the account
|language      |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state         |The account state, one of `active`, `inactive`, `blocked`, `deleted`
|hasPassword   |(optional) Boolean indicating if the user has a password set
|isPrincess    |(optional) User Princess level of this account (unsigned Integer). Only included when accessing user is princess.
|openID        |(optional) Array of linked OAuth / Open ID Connect accounts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)


#### PUT account
##### Input
To change account data, the following has to be sent in a PUT Request:

|Input field     |Description        |
|----------------|-------------------|
|email           |(optional) new email|
|newPassword     |(optional) new password|
|state           |(optional) the new account state, one of `active`, `inactive`, `blocked`, `deleted`|
|isPrincess|(optional, boolean) grants princess priviledges (admin/root)|
|language        |(optional) new language in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`de`, `en`…)|
|oldPassword     |(required for newPassword) current password for this account|
|openID     |(optional) Array of linked OAuth / OpenID Connect acconuts. Each Array item is an object including the fields `sub` (subject), `iss` (issuer), `pending` (true/false), `email` and `name` (as given from the OAuth issuer)|

When changing `state` andr/or `isPrincess`, the logged in user to perform this action needs to have princess (root/admin) access.

Deleting an OAuth / OpenID Connect connection is only allowed if `hasPassword` is true or an other connection which is not pending exists.

##### Output

* **204 no content** if everything went well

### [Resource: account/tokens](id:account-tokens)
Collection of **currently valid** access tokens for an account.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of access tokens.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:account       |The account of the access tokens of this collection.|GET|No.|
|item          |An array of links to the current page of account/token resources. | GET | No. |
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
account/token Resources.

### [Resource: account/token](id:account-token)
A single access token.
Note that the token itself will never be published by the API to prevent misusing them; instead this resource will deliver metadata to enable an overview of issued tokens and the possibility to revoke them.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An access token. |GET, DELETE  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|ec:account       |The account of this access token.|GET|No.|
|collection    |Collection of access tokens. Includes this token.|GET|No.|

##### Properties
| Name         | Description     |
|--------------|-----------------|
|accessTokenID |The unique identifier for an access token as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)). This is NOT the token itself.
|device      |Device this access token was issued to. JSON object provided by [express-useragent](https://github.com/biggora/express-useragent#or-manual-setup-in-project-configenvironmentjs). Notable properties are `Platform`, `OS` and `Browser`.
|ipAddress     |IP Address this access token was issued to (IPv6 or IPv4)
|ipAddressLocation|Assumed Location of the IP Address this access token was issued to as string (e.g. city name)
|isCurrent     |Boolean flag indicating that this access token is the one currently used for this request
|issued        |Timestamp of the creation of this access token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))
|validUntil    |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

### [Resource: account/change-email-verification](id:account-change-email-verificaton)
When the user has requested to change her primary email, this resource is used to verify or abort the change.

#### PUT account/change-email-verification
##### Parameter
To complete the eMail change the following has to be sent as parameters in a PUT request.

|Input field    |Description        |
|---------------|-------------------|
|token          |verification token for this change|

##### Output
* **204 no content** if the change was successfully verified.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** – if the token did not produce a match

#### DELETE account/change-email-verification 
##### Parameter
To abort the eMail change the following has to be sent as parameters in a DELETE request.

|Input field    |Description        |
|---------------|-------------------|
|token          |verification token for this change|

##### Output
* **204 no content** if the token was successfully revoked.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** – if the token did not produce a match.

## Auth

Handles Login, Logout, Registration, Verification, OAuth and Password Reset.

### [Resource: auth/register](id:auth-register)

##### Input
To complete the registration process, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address this account should be linked to. SHOULD be proven for availability before (using auth/email-available)|
|password       |desired password for this account|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|

It is recommended to include an `Accept-Language` header to set the main language for the account. Otherwise, it will default to `en` (English).
See [RFC7231](https://tools.ietf.org/html/rfc7231#section-5.3.5) for details. 

##### Output

* **201 created**

If the user has registered successfully, she is automatically logged in. However, the account state is `inactive` until the eMail address is validated.

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

*If the account state is `blocked`, no accessToken is included. The client should display an error message.*

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **403 Forbidden** – returned if the eMail address is already taken or if the invite code is missing/invalid. Body contains detailed error code and message.

### [Resource: auth/login](id:auth-login)

##### Input
To log in a user using user credentials, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the desired account|
|password       |password for this account|


##### Output

* **200 ok**

If the user credentials are correct, the user is automatically logged in. Note that `state` may still be `inactive`. 

####### if the user credentials were correct (with code 200):

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3y-339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.
|linked         |(optional) the oauth_issuer that was additionally linked to this account.

####### if the user credentials were NOT correct (with code 401):
|Field          |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|lockUntil      |Timestamp of the time until which all login requests for this eMail address will be refused as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)).|


##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **401 Unauthorized** - returned if the `state` of the user is `blocked`. Or the password/eMail combination did not match.
* **403 Forbidden** – returned if there were too many wrong login attempts for this eMail address.


### [Resource: auth/logout](id:auth-logout)
##### Input
To log out a user, the following has to be sent in a POST Request:

This request has to include a valid access token. If the access tokens lifespan is expired but other than that valid the logout will result in a **204 no content** response.

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the logged in account|


##### Output

* **204 no content** if the logout succeeded.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined/

* **401 Unauthorized**  if the eMail address does not match the access token.

### [Resource: auth/password-reset](id:auth-password-reset)

#### Request a password reset
##### Parameter
To send an eMail to a user providing the possibility to reset the password, the following has to be sent as parameters in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|


##### Output

* **202 accepted** if the server is sending the email.

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the eMail is not linked to any account.

#### Perform a password reset
##### Parameter
To reset a password, the following has to be sent as parameters in a PUT Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|password       |new password|

##### Input
To reset a password, the following has to be sent in a PUT Request:

|Input field    |Description        |
|---------------|-------------------|
|token          |password reset token|


##### Output

* **201 created** if the password reset was successful.

The user is automatically logged in after the reset, additionally the token will be invalidated. Output body is the same as with [auth/login](#auth-login).

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.

*If the account state is `blocked`, no accessToken is included. The client should display an error message.*

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the eMail or token is not linked to any account.

#### Abort a passwort reset.
##### Parameter
To abort a password reset, the following has to be sent as parameters in a DELETE Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|
|token          |password reset token|

##### Output

* **204 no content** if the password reset token was successfully invalidated or does not exist.

### [Resource: auth/email-available](id:auth-email-available)

##### Input
This Resource allows verification if an eMail address is still available for registration.
The following has to be sent in a GET **(!)** Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address of the account|


##### Output

* **200 ok** 

|Field          |Description        |
|---------------|-------------------|
|email          |eMail address that was checked|
|available      |true or false    |


### [Resource: auth/email-verification](id:auth-email-verification)

##### Input
This Resource tells the API server that a user who got an eMail address verification eMail clicked on the included link and is thereby the rightful owner of the given address.
The following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|email          |eMail address the token verifies|
|token          |the token that was included in the eMail link|


##### Output

* **204 no content** 

*Note: if the token sent again, the 204 response will be repeated as long as the eMail address is the main address of the account, no error output will be returned for multiple clicks on the verification link.*

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **404 not found** if the given token was not found in the database.


### [Resource: auth/oauth](id:auth-oauth)

Route for logging in or registering using OAuth 2.0 / an OpenID Connect Provider.

##### Input
To complete the registration process, the following has to be sent in a POST Request:

|Input field    |Description        |
|---------------|-------------------|
|oauthIssuer   |The OAuth Provider. `google`, `facebook` or the OpenID URL of a generic OpenID Connect Provider.|
|oauthCode     |the authorization code retrieved from the OAuth Provider|
|invite         |(optional) invite token. Registrations may be declined without an invite token.|

##### Output

###### success:

* **201 created** - if the user is new and now registered
* **200 ok** - for logging in with oauth as an already registered user

If the user has logged in and/or registered successfully, the following is returned:

|Field          |Description        |
|---------------|-------------------|
|accessToken    |access token to be used for API calls for this user|
|email          |eMail address of the logged in account|
|language       |The primary UI language for this account in shortened [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en`, `de`, …)
|message        |(optional) an informational object containing `message` and `info` properties. See below for details.|
|state          |The account state, one of `active`, `inactive`, `blocked`
|userRole       |The user role of the now logged in user, one of `user` or `princess`
|validUntil     |Timestamp of the current end of the validity lifetime of this token as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)). Will change over time when the access token is used.
|linked         |(optional) the oauth_issuer that was additionally linked to this account.

**Updated eMail:** If an OAuth login returned a new/changed email address than the one deposited at the user's account, the `message` field will be included and contain a `message` with the value `updatedEmail` and the new email address in the `info` field. The intended application flow is to tell the user that she should check if her email address is still correct.

###### wrong OAuth provider selected:

* **200 ok**

If the user logged in using an OAuth Provider she did not use before (matching eMail address), the following is returned instead:

|Field          |Description        |
|---------------|-------------------|
|email          |eMail address of the logged in account|
|needsConfirmationWithOtherLoginMethod |Array of possible other login methods. Contains the following properties: accountID, iss, extEmail, extName, pending|

The intended application flow is to send the user to the previously used OAuth Provider (one of `needsConfirmationWithOtherLoginMethod`). After this OAuth request is received, the login will be successful and contain the `linked` attribute. If `iss` is `password`, an email/password login is required. 

##### Error Output
Additionally to common HTTP Error requests (400 Bad Request, …), the following error output is defined:

* **403 Forbidden** – returned if the invite code is missing/invalid. Body contains detailed error code and message.
