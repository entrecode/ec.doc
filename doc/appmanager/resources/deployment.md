## Single Deployment

The single Deployment Resource represents Deployment of an [App](./app/) using a specific [Platform](./platform/) configuration. It consists of a status (successful, failed or still running) and events that occurred during deployment.

The JSON Schema is [https://schema.entrecode.de/schema-app/deployment](https://schema.entrecode.de/schema-app/deployment).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|deploymentID| Integer | 32 Bit signed (max. 2147483647) | The unique identifier for a Deployment | No. Gets generated on creation. |
|started| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the beginning of the deployment.| No. Gets written on creation. |
|finished| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the end of the deployment.| No. Gets written on success/failure. |
|successful| Enum | success, error, running | Indicates if the deployment is still running or finished successfully or with an error. | No. |
|events | Array | | List of deployment Events. | No. |
|results| Array | Array of anything. | Contains the results each target plugin reports on a successful deployment. | No. |

<h3>Events Array Item Properties</h3>
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|deploymentEventID|Integer | 64 Bit signed (max. 9223372036854775807) | The unique identifier for a Deployment Event | No. |
|deploymentEventType| String | valid deployment event type| Specifies the type of the deployment event. | No. |
|timestamp| String| ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))| Timestamp of the occurrence of the event.| No. |
|message| String || Human-readable description of the Event|No.|
|temporary |Boolean | not null | A temporary event marks the start of an action that will be finished with either a success or a failure event. | No.|
|info| JSON || Additional information about the event in any format. | No. |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Deployment](#)| The resource itself | GET |
| collection    | [Deployment List](#list)| List of all available Deployments | GET, POST|
| ec:app | [App](./app/) | The app this Deployment is corresponding to. | GET, PUT, DELETE |
| ec:app/build | [Build](./build/) | The build used in this deployment. | GET |
| ec:app/platform | [Platform](./platform/) | The Platform that is deployed | GET, DELETE |

## List

The Deployment List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Deployment Resources.

## Possible Actions

*Modifying (editing or deleting) a Deployment Resource is not possible.* 

## Read

To read a single Deployment Resource, clients may perform GET on a `ec:app/deployment` relation.

To read the Deployment List Resource, clients may perform GET on a `ec:app/deployments` relation or on the `collection` relation of a single Deployment resource. The query string parameter `platformID` is mandatory.

In both cases, the success status code is **200 OK.**

## Create

To create a new Deployment Resource, clients may perform a POST on `ec:app/deployments` (the list resource) with an empty Body but a query string parameter `platformID`, `buildID` of the Build Resource to deploy and, one or multiple `targetID`s where to deploy to.

This will start a new Deployment for the referenced Build to all Targets.

The success status code is **201 Created** and the response body is the newly created single Deployment resource. Note that the resource is created and returned instantly, and not after the Deployment has finished. Clients may follow the `self` relation of the returned resource to obtain the Deployment Status at a later time.
