# Single Platform

The single Platform Resource represents a build configuration for a specific [App](resource/app). It has exactly one [CodeSource](resource/codesource) and [DataSource](resource/datasource), and at least one [Target](resource/target). It may have an arbitrary number of [Deployments](resource/deployment#list).
It has a specific [PlatformType](#platform-types) that defines the behavior when deploying.

The JSON Schema is [https://entrecode.de/schema/platform](https://entrecode.de/schema/platform).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|platformID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a Platform | No. Gets generated on creation. |
|platformType| String | valid [platformType](#platform-types) | Specifies the type of the platform. | Yes. |
|title|String||Friendly name for the Platform|Yes|
|config| JSON Object | valid against the JSON Schema of the selected platformType | platformType-dependent configuration options. | Yes. |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Platform](#)| The resource itself | GET, DELETE |
| collection    | [Platform List](#list)| List of all available Platforms | GET, POST|
| ec:app | [App](resources/app) | The app this Platform is corresponding to. | GET, PUT, DELETE |
| ec:app/codesource | [CodeSource](resources/codesource) | The Code Source of the Platform | GET, PUT |
| ec:app/datasource | [DataSource](resources/datasource) | The Data Source of the Platform | GET, PUT |
| ec:app/target | [Target](resources/target) | A Target of the Platform (may occur several times) | GET, PUT |
| ec:app/deployment/latest | [Deployment](resources/deployment) | The latest deployment of this Platform | GET |
| ec:app/deployments | [Deployment List](resources/deployment#list) | List of deployments that were executed for this platform. POST to this link relation to create a new deployment for the platform. | GET, POST |

# List

The Platform List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Platform Resources.

# Possible Actions

*Editing (PUT) is currently not implemented.* 

## Read

To read a single Platform Resource, clients may perform GET on a `ec:app/platform` relation.

To read the Platform List Resource, clients may perform GET on a `ec:app/platforms` relation or on the `collection` relation of a single Platform resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new Platform Resource, clients may perform a POST on `ec:app/platforms` (the list resource). The JSON Schema for creating a new Platform is [https://entrecode.de/schema/platform-template](https://entrecode.de/schema/Platform-template). 

The success status code is **201 Created** and the response body is the newly created single Platform resource.

*Note that the used CodeSource, DataSource and Targets have to be created first.*

## Delete

To delete an existing Platform Resource, clients may perform a DELETE on `ec:platform` or `self` at a single Platform Resource.

*This also deletes the related deployment resources, so handle with care! CodeSources, DataSources and Targets stay.*

The success status code is **204 No Content** with an empty response body.

# Platform Types

## staticWebsite

Generates a static Website. No configuration needed. Expects valid CodeSource and DataSource.