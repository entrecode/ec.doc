# Invite Resource

The Invite Resource is a resource listing available account registration invites.
It is always a single resource, containing an arbitrary number of available invites. Eligible users can post to the resource to generate new invites.

The JSON Schema is [https://entrecode.de/schema/invites](https://entrecode.de/schema/invites)

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|invites| Array[String] | Version 4 UUIDs ([RFC 4122](http://tools.ietf.org/html/rfc4122))| Available invite codes | No |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Invites](#)| The resource itself | GET, POST |
| ec:auth       | [Entry Point](./auth/#entry-point)| Account Server Entry Point | GET |

# Possible Actions

## Read

To read the Invite Resource, clients may perform GET on an `ec:invites` relation.

The success status code is **200 OK.**


#### Example
```
{
  "invites": [
    "375476f6-4732-4dfe-bd4c-0fe0dc57e19b",
    "26e1e48f-a11d-427f-8392-4aee6371e95e",
    "dcc4bafd-5fc4-47d1-b90b-2efe67be49f9",
    "6614ab11-14e1-40d8-8ed0-50693ef2113e",
    "7d04e725-e113-4e0d-8e33-2192a0f832f0",
    "4e8076c0-2e5a-423e-9a86-c4abdc283c21",
    "c3ec6ea9-8c84-43d7-9fa0-e0a1ee5d6214",
    "70b85711-d6ee-46b8-9a5b-8af2c7502df2",
    "ef5fa711-884a-40d2-9754-311b8b4bb309",
    "fbbdc462-7774-40f5-9d57-4148a395d472"
  ],
  "_links": {
    "self": {
      "href": "https://accounts.entrecode.de/invite
    },
    "curies": {
      "href": "https://entrecode.de/doc/rel/{rel}",
      "templated": true
    },
    "collection": {
      "href": "https://accounts.entrecode.de/"
    }
  }
}
```


## Create

To create new invite(s), clients may perform a POST on `ec:invites`. The JSON Schema for creating new Invites is [https://entrecode.de/schema/invites-template](https://entrecode.de/schema/invites-template). It may be an empty body, or a JSON containing a `count` number. An empty body is equivalent to using `"count": 1`. It indicates how much new invites will be generated.

The success status code is **201 Created** and the response body is the Invite Resource including the new invite(s)

## Delete

It is not possible to delete generated invite codes. However, they get invalidated on usage and will not be visible through this resource anymore.
