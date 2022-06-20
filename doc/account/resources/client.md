## Single Client 
A single entrecode Client.

Clients are needed to be registered using this resource.

The JSON Schema is [https://schema.entrecode.de/schema-acc/client](https://schema.entrecode.de/schema-acc/client)

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|clientID| String | lowercase characters, numbers and `-` | The unique identifier for a Client | Only on creation. |
|callbackURL | String | URI | The client's URI to redirect to after login | Yes|
|config   |Object|*see below*|Configuration |Yes|
|config.tokenMethod | String | one of `query`, `cookie`, `body` | The clients's allowed tokenMethod | Yes |

## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Client](#)| The resource itself | GET, PUT |
| collection    | [Client List](#list)| List of all available Clients | GET |


## List

The Client List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Client Resources.

## Possible Actions

## Read

To read a single Client Resource, clients may perform GET on a `ec:client` relation.

To read the Client List Resource, clients may perform GET on a `ec:clients` relation or on the `collection` relation of a single Client resource.

In both cases, the success status code is **200 OK.**


#### Example
```
{
  "clientID": "my-app",
  "callbackURL": "https://my-app.com/callback",
  "config": {
    "tokenMethod": "cookie"
  }
  "_links": {
    "self": {
      "href": "https://accounts.entrecode.de/client?clientID=my-app"
    },
    "curies": {
      "href": "https://entrecode.de/doc/rel/{rel}",
      "templated": true
    },
    "collection": {
      "href": "https://accounts.entrecode.de/clients"
    }
  }
}
```


## Create

To create a new Client Resource, clients may perform a POST on `ec:clients` (the list resource). The JSON Schema for creating a new Client is [https://schema.entrecode.de/schema-acc/client](https://schema.entrecode.de/schema-acc/client). 

Identical to [Edit](#edit), but `clientID` is writable and required.

The success status code is **201 Created** and the response body is the newly created single Client resource.


## Edit

To update an existing Client Resource, clients may perform a PUT on `ec:client` or `self` at a single Client Resource. The JSON Schema for editing a Client is [https://schema.entrecode.de/schema-acc/client](https://schema.entrecode.de/schema-acc/client). 

Note that the `clientID` cannot be changed.

The success status code is **200 OK** and the response body is the updated single Client resource.


## Delete

To delete an existing Client Resource, clients may perform a DELETE on `ec:client` or `self` at a single Client Resource. 

The success status code is **204 No Content** with an empty response body.

