# Single Data Manager
The single Data Manager Resource represents an isolated “space”. A Data Manager can have any number models and assets.

The JSON Schema is [https://entrecode.de/schema/datamanager](https://entrecode.de/schema/datamanager).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
| dataManagerID | String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for this Data Manager | No. Gets generated on creation. |
|created| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the creation of this Data Manager| No. Gets written on creation. |
|title|String| | Friendly name for the Data Manager|Yes|
|description|String| | A longer description for this Data Manager Space.|Yes|
|hexColor|String|6-digit hex color `#rrggbb` `/^#[A-Fa-f0-9]{6}$/`|Color identifier for editor.|Yes|
|config | JSON |  		|A JSON object for various configurations. See Schema for details.| Yes|
|rights  | Array | One of  `manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`| *Deprecated* Array of available rights. Not included rights are not available. | No |
|publicAssetRights| Array | One of `get`, `put`, `postPrivate`, `postPublic` | Array of available rights for public assets API. Not included rights are not available.| Yes |
|locales | Array | [RFC4646](https://tools.ietf.org/html/rfc4646)|Available locales in this Data Manager Space.| Yes |
|defaultLocale | String | [RFC4646](https://tools.ietf.org/html/rfc4646)| The default locale of this Data Manager Space. Included in `locales`.| Yes |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Data Manager](#)| The resource itself | GET, PUT |
| collection    | [Data Manager List](#list)| List of all available Data Managers | GET, POST|
| ec:assets     | [Asset List](./asset/#list) | Collection of assets associated with this Data Manager Space. |GET, POST|
| ec:assets/deleted| [Asset List](./asset/#list) | Collection of deleted assets associated with this Data Manager Space. |GET|
| ec:models     |[Model List](./model/#list)|Collection of models associated with this Data Manager Space. |GET, POST|
| ec:dm-template| [Data Manager Template](./template) | Template that was used when generating this Data Manager (optional) | GET |
| ec:datamanager/export |[Export Data Manager](#export)|Postman Collection export of a Data Manager. |GET|

# List

The Data Manager List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Data Manager Resources.

Additionally, it is the entry point for the Data Manager Manager API. Because of that, it has an additional `msg` property with a greeting string (including the API Server version number). 

# Possible Actions

## Read

To read a single Data Manager Resource, clients may perform GET on a `ec:datamanager` relation.

To read the Data Manager List Resource, clients may perform GET on a `ec:datamanagers` relation or on the `collection` relation of a single Data Manager resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new Data Manager Space, clients may perform a POST on `ec:datamanagers` (the list resource). The JSON Schema for creating a new Data Manager is [https://entrecode.de/schema/datamanager-template](https://entrecode.de/schema/datamanager-template). 

The success status code is **201 Created** and the response body is the newly created single Data Manager resource.

### Create from Template

When following the [datamanagers/new-from-template](../datamanager#relation-datamanagers/new-from-template) relation, a query parameter `templateID` is appended to the URI. If the templateID is given, instead of a single Data Manager a new Data Manager is created using the [template](./dm-template) – including models and other configuration defined in the template. 
Then the request body is not required to respect the [datamanager-template](https://entrecode.de/schema/datamanager-template) JSON schema, but instead to respect the schema in the templates' `dataSchema` property.

## Edit

To update an existing Data Manager Resource, clients may perform a PUT on `ec:datamanager` or `self` at a single Data Manager Resource. The JSON Schema for editing a Data Manager is [https://entrecode.de/schema/datamanager-template](https://entrecode.de/schema/datamanager-template). Title and description of the Data Manager can be changed. Locales can be added or deleted and a defaultLocale can be set.

The success status code is **200 OK** and the response body is the updated single Data Manager resource.

    The Data Manager configuration is heavily cached. For changes to take effect, wait for at most 10 seconds.

### Update from Template

When following the [datamanager/update-from-template](../datamanager#relation-datamanager/update-from-template) relation, a query parameter `templateID` is appended to the URI. If the templateID is given, instead of a single Data Manager a new Data Manager is created using the [template](./dm-template) – including models and other configuration defined in the template.
Then the request body is not required to respect the [datamanager-template](https://entrecode.de/schema/datamanager-template) JSON schema, but instead to respect the schema in the templates' `dataSchema` property.

An update is only possible if the data manager was created with a parent template of the desired template.


## Delete

To delete a Data Manager including all its data, clients may perform a DELETE on `ec:datamanager` or `self` at a single Data Manager Resource. This deletes the Data Manager permanently, including all its models, assets, and generated API resources.

*It is not possible to restore a deleted Data Manager in any way, so handle this method with care!*

The success status code is **204 No Content** with an empty response body.

## Export

To export the structure of a Data Manager Resource, clients can follow the relation `ec:datamananger/export` and perform a GET request. This will create a [Postman Collection](https://www.getpostman.com/docs/collections) which in turn can be used in [Postman](https://www.getpostman.com/) (or [Newman Runner](https://www.getpostman.com/docs/newman_intro); or [ec.service-newman](https://stash.entrecode.de/projects/MICRO/repos/ec.service-newman/browse)) in order to create a copy of the Data Manager. Note that only the Data Manager config itself, clients, roles, models, and policies are exported. Entries and Assets will be left behind.

The success status code is **200 OK.** and the response body will be a object containing `collection` and `dataScheme`. `collection` is the Postman Collection and `dataScheme` is a [JSON Schema](http://json-schema.org/) of the required variables for the collection.

The exported collection can also be used for creating a template for Data Managers. But this won't be part of this documentation.
