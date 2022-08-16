## Single Token

A single access token.
Note that the token itself will never be published by the API to prevent misusing them; instead this resource will deliver metadata to enable an overview of issued tokens and the possibility to revoke them.

The JSON Schema is [https://schema.entrecode.de/schema-acc/account-token](https://schema.entrecode.de/schema-acc/account-token).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
| accessTokenID | String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for the Token. This is NOT the token itself. It is equivalent to the JWT's `jti`. | No. Gets generated on creation. |
|device      |JSON||Device this access token was issued to. JSON object provided by [express-useragent](https://github.com/biggora/express-useragent#or-manual-setup-in-project-configenvironmentjs). Notable properties are `Platform`, `OS` and `Browser`.| No |
|ipAddress   | String | IP Address (IPv6 or IPv4)  |IP Address this access token was issued to | No |
|ipAddressLocation|String||Assumed Location of the IP Address this access token was issued to (e.g. city name) | No |
|isCurrent     |Boolean||Flag indicating that this access token is the one currently used for this request| No |
| issued | String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of this access token| No |
| validUntil | String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the current end of the validity lifetime of this token.| No |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Token](#)| The resource itself | GET, DELETE |
| collection    | [Token List](#list)| List of all available Tokens | GET|
| ec:account   | [Account](./account/) |The account of this access token.|GET, PUT|

## List

The Token List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Token Resources.

It is a collection of **currently valid** access tokens for an account.

## Possible Actions

## Read

To read a single Token Resource, clients may perform GET on a `ec:account/token` relation.

To read the App List Resource, clients may perform GET on a `ec:account/tokens` relation or on the `collection` relation of a single Token resource.

In both cases, the success status code is **200 OK.**

## Create

A new token gets generated on [Login](./auth/#login).
For API Keys, a long-lived token gets generated on creation.

It is possible to add 1 additional token to API Key Accounts (Accounts without password and without email address). POST to `ec:account/tokens` with account edit permission.
An API Key Account can have a maximum of 2 valid tokens at any time. To create more, invalidate an old one first.

## Edit

Modification of Tokens is not possible.

## Delete

A token can be revoked by performing a DELETE Request on a single Token resource. The token can then not be used anymore, regardless of its `validUntil` value. 
The current token (`isCurrent === true`) cannot be deleted. Perform a [Logout](./auth/#logout) instead.
