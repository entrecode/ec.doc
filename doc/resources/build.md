# Single Build

The single Build Resource represents Build of an [App](./app/) using a specific [Platform](./platform/) configuration. It consists of a status (`success`, `error` or `running`) and events that occurred during build process.

The JSON Schema is [https://entrecode.de/schema/build](https://entrecode.de/schema/build).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|buildID| Integer | 32 Bit signed (max. 2147483647) | The unique identifier for a Build | No. Gets generated on creation. |
|started| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the beginning of the build.| No. Gets written on creation. |
|finished| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the end of the build.| No. Gets written on success or error. |
|successful| ENUM | `success`, `error`, `running` | Indicates if the build is still running,finished successfully, or with an error. | No. |
|buildLocation|JSON||Object describing the location where the sucessful build is stored|No.|
|events | Array | | List of build Events. | No. |

<h3>Events Array Item Properties</h3>
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|buildEventID|Integer | 64 Bit signed (max. 9223372036854775807) | The unique identifier for a Build Event | No. |
|buildEventType| String | valid deployment event type| Specifies the type of the build event. | No. |
|timestamp| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the occurrence of the event.| No. |
|message| String || Human-readable description of the Event|No.|
|temporary |Boolean | not null | A temporary event marks the start of an action that will be finished with either a success or a failure event. | No.|
|info| JSON || Additional information about the event in any format. | No. |

<h3>buildLocation Properties</h3>
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|type|String|`zipFile`|The type with which the build was saved. Was saved with a [Target](./target/).|No.|
|config|JSON||Object containing info needed for retrieval of the saved build. With `zipFile` it is the `url` of the file.|No.|
# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Build](#)| The resource itself | GET |
| collection    | [Build List](#list)| List of all available Builds | GET, POST|
| ec:app | [App](./app/) | The app this Deployment is corresponding to. | GET, PUT, DELETE |
| ec:app/platform | [Platform](./platform/) | The Platform that is deployed | GET, DELETE |

# List

The Build List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Build Resources.

# Possible Actions

*Editing a Build Resource is not possible.* 

## Read

To read a single Build Resource, clients may perform GET on a `ec:app/build` relation.

To read the Build List Resource, clients may perform GET on a `ec:app/builds` relation or on the `collection` relation of a single Build resource. The query string parameter `platformID` is mandatory.

In both cases, the success status code is **200 OK.**

## Delete

To delete a single Build Resource, clients may perform a DELETE on a `ec:app/build` relation or the `self` relation of a single Build Resource.

The success status code is **200 OK.**

## Create

To create a new Build Resource, clients may perform a POST on `ec:app/builds` (the list resource) with an empty Body but a query string parameter `platformID`.

This will start a new Build for the referenced platform.

The success status code is **201 Created** and the response body is the newly created single Build resource. Note that the resource is created and returned instantly, and not after the Build has finished. Clients may follow the `self` relation of the returned resource to obtain the Build Status at a later time.
