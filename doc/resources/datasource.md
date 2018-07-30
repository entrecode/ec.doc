# Single DataSource

The single DataSource Resource represents a data source that is needed for [Deployments](./deployment/#list) of a [Platform](./platform/). 
It has a specific [DataSourceType](#datasource-types) that defines the behavior when deploying.

The JSON Schema is [https://entrecode.de/schema/datasource](https://entrecode.de/schema/datasource).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|dataSourceID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a DataSource | No. Gets generated on creation. |
|dataSourceType| String | valid [dataSourceType](#datasource-types) | Specifies the type of the DataSource. | Yes. |
|config| JSON Object | valid against the JSON Schema of the selected dataSourceType | dataSourceType-dependent configuration options. | Yes. |
|config.context| JSON Object | Object with `appID`, `shortAppID`, `appTitle`, `buildCount`, `deploymentCount` | Context object used in all platform and plugin types. Contains info about the app | No. |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [DataSource](#)| The resource itself | GET, PUT, DELETE |
| collection    | [DataSource List](#list)| List of all available DataSources | GET, POST|
| ec:app | [App](./app/) | The app this dataSource is corresponding to. | GET, PUT, DELETE |
| ec:app/platform| [Platforms](./platform/) | Platforms that use this dataSource. (optional) | GET, PUT, DELETE |

*Note that a dataSource cannot be deleted if it is used in at least one platform.*

# List

The DataSource List Resource is a [Generic List Resource](/#generic-list-resources) with embedded DataSource Resources.

# Possible Actions

## Read

To read a single DataSource Resource, clients may perform GET on a `ec:app/datasource` relation.

To read the DataSource List Resource, clients may perform GET on a `ec:app/datasources` relation or on the `collection` relation of a single DataSource resource.

In both cases, the success status data is **200 OK.**

## Create

To create a new DataSource Resource, clients may perform a POST on `ec:app/datasource` (the list resource). The JSON Schema for creating a new DataSource is [https://entrecode.de/schema/datasource-template](https://entrecode.de/schema/datasource-template). 

The success status data is **201 Created** and the response body is the newly created single DataSource resource.

## Edit

To update an existing DataSource Resource, clients may perform a PUT on `ec:app/datasource` or `self` at a single DataSource Resource. The JSON Schema for editing an DataSource is [https://entrecode.de/schema/datasource-template](https://entrecode.de/schema/datasource-template). 

The success status data is **200 OK** and the response body is the updated single DataSource resource.

## Delete

To delete an existing DataSource Resource, clients may perform a DELETE on `ec:app/datasource` or `self` at a single DataSource Resource. This is only possible if the dataSource is not used in any platform (would trigger an error 403 with code 3370).

The success status data is **204 No Content** with an empty response body.


# DataSource Types
All DataSource types SHOULD contain a required property `hexColor` in the config_schema. `hexColor` SHOULD be the regex format `^#[A-Fa-f0-9]{6}$` (`#d23738`).

## ownDataManager

Pulls data out of a Data Manager.

Expected configuration: a JSON object with the key `url` is needed, linking to the generated API of the Data Manager, and the key `hexColor`, with the desired color shown in the editor frontend (format: `#d23738`).
