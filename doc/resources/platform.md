# Single Platform

The single Platform Resource represents a build configuration for a specific [App](./app/). It has exactly one [CodeSource](./codesource/) and [DataSource](./datasource/), and at least one [Target](./target/). It may have an arbitrary number of [Deployments](./deployment/#list).
It has a specific [PlatformType](#platform-types) that defines the behavior when deploying.

The JSON Schema is [https://entrecode.de/schema/platform](https://entrecode.de/schema/platform).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|platformID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a Platform | No. Gets generated on creation. |
|platformType| String | valid [platformType](#platform-types) | Specifies the type of the platform. | Yes. |
|title|String||Friendly name for the Platform|Yes|
|config| JSON Object | valid against the JSON Schema of the selected platformType | platformType-dependent configuration options. | Yes. |
|_context| JSON Object | Object with `appID`, `shortAppID`, `appTitle`, `buildCount`, `deploymentCount` | Context object used in all platform and plugin types. Contains info about the app | No. |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Platform](#)| The resource itself | GET, DELETE |
| collection    | [Platform List](#list)| List of all available Platforms | GET, POST|
| ec:app | [App](./app/) | The app this Platform is corresponding to. | GET, PUT, DELETE |
| ec:app/codesource | [CodeSource](./codesource/) | The Code Source of the Platform | GET, PUT |
| ec:app/datasource | [DataSource](./datasource/) | The Data Source of the Platform | GET, PUT |
| ec:app/target | [Target](./target/) | A Target of the Platform (may occur several times) | GET, PUT |
| ec:app/deployment/latest | [Deployment](./deployment/) | The latest deployment of this Platform | GET |
| ec:app/deployments | [Deployment List](./deployment/#list) | List of deployments that were executed for this platform. POST to this link relation to create a new deployment for the platform. | GET, POST |
| ec:app/deployments/options | [Deployment List](./deployment/#list) | List of deployments with filter options | GET |
| ec:app/build/latest | [Build](./build/) | The latest build of this Platform | GET |
| ec:app/builds | [Build List](./build/#list) | List of builds that were executed for this platform. POST to this link relation to create a new build for the platform. | GET, POST |
| ec:app/builds/options | [Build List](./build/#list) | List of builds with filter options. | GET |

# List

The Platform List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Platform Resources.

# Possible Actions

*Editing (PUT) is currently not implemented.* 

## Read

To read a single Platform Resource, clients may perform GET on a `ec:app/platform` relation.

To read the Platform List Resource, clients may perform GET on a `ec:app/platforms` relation or on the `collection` relation of a single Platform resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new Platform Resource, clients may perform a POST on `ec:app/platforms` (the list resource). The JSON Schema for creating a new Platform is [https://entrecode.de/schema/platform-template](https://entrecode.de/schema/platform-template). 

The success status code is **201 Created** and the response body is the newly created single Platform resource.

*Note that the used CodeSource, DataSource and Targets have to be created first.*

## Delete

To delete an existing Platform Resource, clients may perform a DELETE on `ec:platform` or `self` at a single Platform Resource.

*This also deletes the related deployment resources, so handle with care! CodeSources, DataSources and Targets stay.*

The success status code is **204 No Content** with an empty response body.

# Platform Types
All Platform types SHOULD contain a required property `hexColor` in the config_schema. `hexColor` SHOULD be the regex format `^#[A-Fa-f0-9]{6}$` (`#d23738`).

## staticWebsite

Generates a static Website.

Expected configuration: a JSON object with the key `hexColor` with the desired color shown in the editor frontend (format: `#d23738`).

Expects valid CodeSource and DataSource.
