## Single Data Manager Template
A single entrecode Data Manager Template.

Data Manager Templates are basically [Postman Collections](https://www.getpostman.com/docs/collections) – a series of templated HTTP Requests that can be run using [Postman](https://www.getpostman.com/), the [Newman](https://github.com/postmanlabs/newman) command-line utility or the entrecode Newman Microservice.

Templates are always rooted in a base template (or a are a base template themselves). There are only updates possible, e.g. when a Data Manager Template gets a new model after sometime, there is the first version that is the initial template (creating the Data Manager etc) and then a second version that only adds the new model. When creating a new Data Manager, the base template is run and all update versions up to the desired version. There is no downgrade logic.

The JSON Schema is [https://schema.entrecode.de/schema-data/dm-template](https://schema.entrecode.de/schema-data/dm-template).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|templateID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a template | No. Gets generated on creation. |
|name| String | | Friendly name for the Template | Yes |
|collection| JSON Object | [Postman Collection](https://schema.getpostman.com/json/collection/v1.0.0/) | The request collection that builds up the data manager | Yes |
|dataSchema| JSON Object | [JSON Schema](http://json-schema.org/draft-04/schema) | Optional. JSON Schema describing the expected `data` object for running `collection` | Yes |
|version | String | ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339)) | Version (Timestamp) | No. Gets written on creation. |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [DM Template](#)| The resource itself | GET |
| collection    | [DM Template List](#list)| List of all available Data Manager Templates | GET, POST |
| ec:datamanagers| [Data Manager List](./datamanager/#list) | Data Manager entry point | GET, POST |
| ec:dm-template/parent | [DM Template](#) | Parent Template (previous version of this template) | GET |
| ec:datamanagers/new-from-template | [Data Managers](resources/datamanager/#list) | Create a new Data Manager from this template | POST |
| ec:datamanager/update-from-template |[Data Manager](resources/datamanager/) | Try to update Data Manager to template (templated Link)| PUT |


## List

The Data Manager Template List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Data Manager Template Resources.

## Possible Actions

## Read

To read a single Data Manager Template Resource, you may perform GET on a `ec:dm-template` relation.

To read the Data Manager Template List Resource, you may perform GET on a `ec:dm-templates` relation or on the `collection` relation of a single Data Manager Template resource.

In both cases, the success status code is **200 OK.**


#### Example
```
 {
        "templateID": "53361701-09a9-4401-a438-73e1a767c45b",
        "name": "Ironic App",
        "collection": {
            ... postman collection ...
        },
        "dataSchema": {}
        "_links": {
          "ec:dm-template/parent": {
            "href": "https://datamanager.entrecode.de/template?templateID=57e0c6eb-0041-41a7-8d27-ebb480ad1c2d"
          }
        }
      }
```


## Create

To create a new Data Manager Template Resource, you may perform a POST on `ec:dm-templates` (the list resource). The JSON Schema for creating a new Data Manager Template is [https://schema.entrecode.de/schema-data/dm-template-template](https://schema.entrecode.de/schema-data/dm-template-template). 

The success status code is **201 Created** and the response body is the newly created single Data Manager Template resource.


## Edit / Delete

It is not possible to edit or delete templates.
