## Single App

The single App Resource represents an isolated “space”. An App can have any number of platforms. 

The JSON Schema is [https://entrecode.de/schema/app](https://entrecode.de/schema/app).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|appID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for an App | No. Gets generated on creation. |
|shortID| String | Shortened UUID| The unique identifier for an App used when deploying on some targets. | No. Gets generated on creation. |
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of the App| No. Gets written on creation. |
|title|String||Friendly name for the App|Yes|
|hexColor|String|6-digit hex color `#rrggbb` `/^#[A-Fa-f0-9]{6}$/`|Color identifier for editor.|Yes|

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [App](#)| The resource itself | GET, PUT, DELETE |
| collection    | [App List](#list)| List of all available Apps | GET, POST|
| ec:app/platforms | [Platform List](./platform/#list) | List of this App´s platforms | GET, POST |
| ec:app/codesources | [CodeSource List](./codesource/#list) | List of CodeSources configured for this App | GET, POST |
| ec:app/datasources | [DataSource List](./datasource/#list) | List of DataSources configured for this App | GET, POST |
| ec:app/targets | [Target List](./target/#list) | List of Targets configured for this App | GET, POST |

## List

The App List Resource is a [Generic List Resource](/#generic-list-resources) with embedded App Resources.

Additionally, it is the entry point for the App Manager API. Because of that, it has an additional `msg` property with a greeting string (including the API Server version number). 

## Possible Actions

## Read

To read a single App Resource, clients may perform GET on a `ec:app` relation.

To read the App List Resource, clients may perform GET on a `ec:apps` relation or on the `collection` relation of a single App resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new App Resource, clients may perform a POST on `ec:apps` (the list resource). The JSON Schema for creating a new App is [https://entrecode.de/schema/app-template](https://entrecode.de/schema/app-template). 

The success status code is **201 Created** and the response body is the newly created single App resource.

## Edit

To update an existing App Resource, clients may perform a PUT on `ec:app` or `self` at a single App Resource. The JSON Schema for editing an App is [https://entrecode.de/schema/app-template](https://entrecode.de/schema/app-template). 

The success status code is **200 OK** and the response body is the updated single App resource.

## Delete

To delete an existing App Resource, clients may perform a DELETE on `ec:app` or `self` at a single App Resource. This marks the App for deletion and makes it (including all related subresources) unavailable over the API. At some later point, it will even be wiped from the App Server.

*Currently it is not possible to restore a deleted App using the API, so handle this method with care!*

The success status code is **204 No Content** with an empty response body.
