## Single Data Manager Client
A single entrecode Data Manager Client.

Client registration is needed to obtain access tokens. Due to the authentication flow of OAuth, the end user is sent to the OAuth Provider in the browser, and afterwards redirected back to the client application. The access token can only be sent to the client using a valid redirect URL that gets the token appended as query string parameter or cookie.

Clients have an alphanumerical ID and some configuration – primarily a callback URL that is used to redirect the user back to the client after successful authentication.

The JSON Schema is [https://schema.entrecode.de/schema-data/dm-client](https://schema.entrecode.de/schema-data/dm-client).

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|clientID  | String | `^[0-9a-z\-_]+$` | Unique Identifier for a client | Only on creation |
|callbackURL| String | Valid URL ([RFC 1738](http://www.rfc-base.org/txt/rfc-1738.txt)) | URL to send the user back to after authentication | Yes |
|tokenMethod| Array[String] | `query`, `cookie` or `body` | Indicates how the client expects the token to receive. Default: `query` | Yes |
|disableStrategies| Array[String] | valid login strategy (i.e. `password`, `google`, `facebook`) | Disable one or more login strategies for this client | Yes |
|hexColor|String|6-digit hex color `#rrggbb` `/^#[A-Fa-f0-9]{6}$/`|Color identifier for editor.|Yes|


## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [DM Client](#)| The resource itself | GET, PUT, DELETE |
| collection    | [DM Client List](#list)| List of all available Data Manager Clients | GET, POST |
| ec:datamanager| [Data Manager](./datamanager/) | Data Manager this resource belongs to | GET, PUT |


## List

The Data Manager Client List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Data Manager Client Resources.

## Possible Actions

## Read

To read a single Data Manager Client Resource, clients may perform GET on a `ec:dm-client` relation.

To read the Data Manager Client List Resource, clients may perform GET on a `ec:dm-clients` relation or on the `collection` relation of a single Data Manager Client resource.

In both cases, the success status code is **200 OK.**


#### Example
```
{
  "clientID": "default-web-client",
  "callbackURL": "https://my-client.example/callback",
  "tokenMethod": [
    "query"
  ],
  "disableStrategies": [
    "google"
  ],
  "hexColor": "#00beef,
  "_links": {
    "self": {
      "href": "https://datamanager.entrecode.de/client?dataManagerID=00000000-0000-4444-8888-000000000000&clientID=default-web-client"
    },
    "curies": {
      "href": "https://entrecode.de/doc/rel/{rel}",
      "templated": true
    },
    "collection": {
      "href": "https://datamanager.entrecode.de/client?dataManagerID=00000000-0000-4444-8888-000000000000"
    }
  }
}
```


## Create

To create a new Data Manager Client Resource, clients may perform a POST on `ec:dm-clients` (the list resource). The JSON Schema for creating a new Data Manager Client is [https://schema.entrecode.de/schema-data/dm-client-template-post](https://schema.entrecode.de/schema-data/dm-client-template-post). 

Identical to [Edit](#edit), but `clientID` and `callbackURL` are both required. 

The success status code is **201 Created** and the response body is the newly created single Data Manager Client resource.


## Edit

To update an existing Data Manager Client Resource, clients may perform a PUT on `ec:dm-client` or `self` at a single Data Manager Client Resource. The JSON Schema for editing a Data Manager Client is [https://schema.entrecode.de/schema-data/dm-client-template-put](https://schema.entrecode.de/schema-data/dm-client-template-put). 

It is possible to make partial changes. Missing properties keep their old value.

The success status code is **200 OK** and the response body is the updated single Data Manager Client resource.


## Delete

To delete an existing Data Manager Client Resource, clients may perform a DELETE on `ec:dm-client` or `self` at a single Data Manager Client Resource. 

The success status code is **204 No Content** with an empty response body.

