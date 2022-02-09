## App Stat

The App Stats Resources represents statistics for all available [Apps](./app/) in App Manager. It shows all App regardless of an available permission for the specific app.

## Properties

| Property           | Type    | Format                                                          | Description                                     | Writable |
|--------------------|---------|-----------------------------------------------------------------|-------------------------------------------------|----------|
| appID              | String  | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122)) | The unique identifier for an App                | No.      |
| title              | String  |                                                                 | Friendly name of the App                        | No.      |
| monthlyBuilds      | Object  | Monthly Object                                                  | Number of monthly Builds for this App           | No.      |
| monthlyDeployments | Object  | Monthly Object                                                  | Number of monthly Deployments for this App      | No.      |
| totalBuildSize     | Integer |                                                                 | Size of all created builds in byte.             | No.      |
| totalBuilds        | Integer |                                                                 | Number of all Builds. Failed and succeeded.     | No.      |
| totalDeployments   | Integer |                                                                 | Number of all Deployments. Failed and succeeded | No.      |
| usedCodeSources    | Array   | String                                                          | List of all used CodeSource Plugins.            | No.      |
| usedDataSources    | Array   | String                                                          | List of all used DataSource Plugins.            | No.      |
| usedPlatforms      | Array   | String                                                          | List of all used Platform Plugins.              | No.      |
| usedTargets        | Array   | String                                                          | List of all used Target Plugins.                | No.      |

### Monthly Object
| Property | Type    | Format    | Description                                         | Writable |
|----------|---------|-----------|-----------------------------------------------------|----------|
| key      | String  | `YYYY-MM` | The Month in a year eg. `2016-05`.                  | No.      |
| value    | Integer |           | Number of Builds/Deployments in the specific month. | No.      |

## Relations

| Relation Name  | Target Resource         | Description           | Possible Methods |
|----------------|-------------------------|-----------------------|------------------|
| self           | [App Stats](#)          | The resource itself   | GET              |
| collection     | [App Stats](#list)      | The resource itself   | GET              |
| ec:app         | [App List](./app/#list) | The list of all Apps. | GET, PUT, POST   |

## List

The App Stat List Resource is a [Generic List Resource](/#generic-list-resources) with embedded App Stats Resources.

## Possible Actions

*Editing or Deleting the App Stats Resource is not possible.* 

## Read

To read the App Stats Resource, clients may perform GET on a `ec:app-stats` relation.

The success status code is **200 OK.**
