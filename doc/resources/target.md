# Single Target

The single Target Resource represents a deployment target that is needed for [Deployments](./deployment/#list) of a [Platform](./platform/). 
It has a specific [TargetType](#target-types) that defines the behavior when deploying.

The JSON Schema is [https://entrecode.de/schema/target](https://entrecode.de/schema/target).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|targetID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a Target | No. Gets generated on creation. |
|targetType| String | valid [targetType](#target-types) | Specifies the type of the Target. | Yes. |
|config| JSON Object | valid against the JSON Schema of the selected targetType | targetType-dependent configuration options. | Yes. |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Target](#)| The resource itself | GET, PUT, DELETE |
| collection    | [Target List](#list)| List of all available Targets | GET, POST|
| ec:app | [App](./app/) | The app this target is corresponding to. | GET, PUT, DELETE |
| ec:app/platform| [Platforms](./platform/) | Platforms that use this codeSource. (optional) | GET, PUT, DELETE |

*Note that a target cannot be deleted if it is used in at least one platform.*

# List

The Target List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Target Resources.

# Possible Actions

## Read

To read a single Target Resource, clients may perform GET on a `ec:app/target` relation.

To read the Target List Resource, clients may perform GET on a `ec:app/targets` relation or on the `collection` relation of a single Target resource.

In both cases, the success status data is **200 OK.**

## Create

To create a new Target Resource, clients may perform a POST on `ec:app/target` (the list resource). The JSON Schema for creating a new Target is [https://entrecode.de/schema/target-template](https://entrecode.de/schema/target-template). 

The success status data is **201 Created** and the response body is the newly created single Target resource.

## Edit

To update an existing Target Resource, clients may perform a PUT on `ec:app/target` or `self` at a single Target Resource. The JSON Schema for editing an Target is [https://entrecode.de/schema/target-template](https://entrecode.de/schema/target-template). 

The success status data is **200 OK** and the response body is the updated single Target resource.

## Delete

To delete an existing Target Resource, clients may perform a DELETE on `ec:app/target` or `self` at a single Target Resource. This is only possible if the target is not used in any platform (would trigger an error 403 with code 3370).

The success status data is **204 No Content** with an empty response body.


# Target Types
All Target types SHOULD contain a required property `hexColor` in the config_schema. `hexColor` SHOULD be the regex format `^#[A-Fa-f0-9]{6}$` (`#d23738`).

## localWebServer

Expected configuration: a JSON object with the key `hexColor` with the desired color shown in the editor frontend (format: `#d23738`).

The build result is served directly by the App Server.

This target can only be used with the [staticWebsite](./platform/#staticwebsite) platform.


## entrecodeS3

Expected configuration: a JSON object with the key `hexColor` with the desired color shown in the editor frontend (format: `#d23738`).

The build result is served from Amazon S3.

This target can only be used with the [staticWebsite](./platform/#staticwebsite) platform.


## backupS3

Expected configuration: a JSON object with the key `hexColor` with the desired color shown in the editor frontend (format: `#d23738`).

The build result is served as zipped Archive from Amazon S3.
