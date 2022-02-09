## The App Manager

The App Manager is a technical tool for configuring, building and deploying Apps. An App can have multiple platforms to run on. 

## Workflow

An [App](resources/app/) is a single, isolated entity. All other resources are dependent on a single App – they cannot be shared between Apps. 

An App can have a arbitrary number of [Platforms](resources/platform/). A Platform is a special configuration for building the App. It consists of exactly one [CodeSource](resources/codesource/), exactly one [DataSource](resources/datasource/) and at least one (but possible more) [Targets](resources/target/). Dependent on its type, the platform will build a specialized product when a [Build](resources/build/) is created.

Available CodeSource Types, DataSource Types, Target Types and Platform Types can be obtained by getting the [Types](resources/apptypes/) resource. There may be dependencies: a type may require an explicit platform (e.g. the TargetType 'App Store' could only work with the PlatformType 'iOS').

When creating a [Build](resources/build/) for a [Platforms](resources/platform/), the App Server will obtain Code from the [CodeSource](resources/codesource/), Data from the [DataSource](resources/datasource/), then build it according to the [Platform](resources/platform/) and save it for later use. A successful Build can then be deployed to one or many selected [Targets](resources/target/) of all configured Targets of the Platform by creating a [Deployment](resources/deployment/).

A Build or a Deployment is either running, failed or successfully finished.

## App Manager API 

* **Entry Point:** [https://appserver.entrecode.de/](https://appserver.entrecode.de/)
* **[Richardson](http://martinfowler.com/articles/richardsonMaturityModel.html) Maturity Level:** 3 (full Hypermedia)
* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))
* **Root Resource:** `ec:apps` [(App List)](resources/app/#list)
* **Authentication:** Bearer Token aquired using the [Account Server API](account_server/#authentication)

Make sure to read [entrecode API Basics](../) first.


## State Diagram

[![State Diagram](../img/statediagram-app.svg)](../img/statediagram-app.svg)


## Link Relations

Link Relation names are those registered with the [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml). Additionally, custom link relations are used which are built in the form `https://doc.entrecode.de/en/latest/App_Manager/#link-relations/<relation>`. Those relations are also links to their own documentation (on this page). 
For brevity, [CURIE Syntax](http://www.w3.org/TR/curie/) is used which results in relation names of the form `ec:<relation>/<optional_subrelation>`. 

Additional to the official link relations defined by [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml) the App Manager uses the following:


| Link Relation                                                                    | Target Resource                                | Description |
|----------------------------------------------------------------------------------|------------------------------------------------|-------------|
| `ec:app`							<a name="relation-app"></a>                     | [App](resources/app/)                          | A single App |
| `ec:app-stats`					<a name="relation-app-stats"></a>               | [App Stats](resources/app-stats/)              | App Statistics |
| `ec:app/build`					<a name="relation-app/build"></a>               | [Build](resources/build/)                      | A single Build | 
| `ec:app/build/by-id`				<a name="relation-app/build/by-id"></a>         | [Build](resources/build)                       | Templated Link Relation to a specific Build by `buildID` |
| `ec:app/build/latest`				<a name="relation-app/build/by-id"></a>         | [Build](resources/build)                       | The last build of a Platform |
| `ec:app/builds` 					<a name="relation-app/builds"></a>              | [Build List](resources/build/#list)            | List of Builds |
| `ec:app/builds/options` 			<a name="relation-app/builds"></a>              | [Build List](resources/build/#list)            | Filter Options of the Build List |
| `ec:app/by-id`					<a name="relation-app/by-id"></a>               | [App](resources/app/)                          | Templated Link Relation to a specific App by `appID` |
| `ec:app/codesource`				<a name="relation-app/codesource"></a>          | [CodeSource](resources/codesource/)            | The configured CodeSource of a Platform |
| `ec:app/codesource/by-id`			<a name="relation-app/codesource/by-id"></a>    | [CodeSource](resources/codesource/)            | Templated Link Relation to a specific CodeSouce by `codeSourceID` |
| `ec:app/codesources`				<a name="relation-app/codesources"></a>         | [CodeSource List](resources/codesource/#list)  | CodeSources configured in an App |
| `ec:app/codesources/options`     <a name="relation-app/codesources/options"></a> | [CodeSource List](resources/codesource/#list)  | Filter Options of the CodeSource List |
| `ec:app/datasource`				<a name="relation-app/datasource"></a>          | [DataSource](resources/datasource/)            | The configured DataSource of a Platform |
| `ec:app/datasource/by-id`        <a name="relation-app/datasource/by-id"></a>    | [DataSource](resource/datasource/)             | Templated Link Relation to a specific DataSource by `dataSourceID` |
| `ec:app/datasources`				<a name="relation-app/datasources"></a>         | [DataSource List](resources/datasource/#list)  | DataSources configured in an App |
| `ec:app/datasources/options`     <a name="relation-app/datasources/options"></a> | [DataSource List](resources/datasource/#list)  | Filter Options of the DataSource List |
| `ec:app/deployment`				<a name="relation-app/deployment"></a>          | [Deployment](resources/deployment/)            | A single Deployment of a Platform |
| `ec:app/deployment/by-id`        <a name="relation-app/deployment/by-id"></a>    | [Deployment](resources/deployment/)            | Templated Link Relation to a specific Deployment by `deploymentID` |
| `ec:app/deployment/latest`		<a name="relation-app/deployment/latest"></a>   | [Deployment](resources/deployment/)            | The latest Deployment of a Platform |
| `ec:app/deployments`				<a name="relation-app/deployments"></a>         | [Deployment List](resources/deployment/#list)  | All Deployments of a Platform. Also used to create a new Deployment |
| `ec:app/deployments/options`     <a name="relation-app/deployments/options"></a> | [Deyploment List](resources/deployment/#list)  | Filter Options of the Deployment List |
| `ec:app/platform`					<a name="relation-app/platform"></a>            | [Platform](resources/platform/)                | A single Platform |
| `ec:app/platform/by-id`			<a name="relation-app/platform/by-id"></a>      | [Platform](resources/platform/)                | Templated Link Relation to a specific Platform by `platformID` |
| `ec:app/platforms`				<a name="relation-app/platforms"></a>           | [Platform List](resources/platform/#list)      | A list of Platforms of an App |
| `ec:app/platforms/options`		<a name="relation-app/platforms/options"></a>   | [Platform List](resources/platform/#list)      | Filter Options of the Platform List |
| `ec:app/target`					<a name="relation-app/target"></a>              | [Target](resources/target/)                    | A configured Target of a Platform |
| `ec:app/target/by-id`            <a name="relation-app/target/by-id"></a>        | [Target](resources/target/)                    | Templated Link Relation to a specific Target by `targetID`|
| `ec:app/targets`					<a name="relation-app/targets"></a>             | [Target List](resources/target/#list)          | Targets configured in an App |
| `ec:app/targets/options`         <a name="relation-app/targets/options"></a>     | [Target List](resources/target/#list)          | Filter Options of Targets List |
| `ec:apps`							<a name="relation-apps"></a>                    | [App List](resources/app/#list)                | List of Apps |
| `ec:apps/options`					<a name="relation-apps/options"></a>            | [App List](resources/app/#list)                | Filter Options of the App List |
| `ec:apps/types`					<a name="relation-apps/types"></a>              | [App Manager Type Info](resources/apptypes/)   | Information about available CodeSource-, DataSource-, Target- and Platform-Types |
