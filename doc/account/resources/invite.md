## Invite Resource

The Invite Resource is a resource listing available account registration invites.

An invite is basically just a UUID, with optionally assigned permissions and groups. 
This invite can be used to register a new user. The invite's permissions and groups will then directly be assigned to the new user.

Eligible users can post to the list resource to generate (a number of) new invites. They can get permissions and groups assigned via PUT or directly at creation via POST.

The JSON Schema is [https://schema.entrecode.de/schema-acc/invite](https://schema.entrecode.de/schema-acc/invite)

> **CHANGES with Account Server 0.13**:
> 
> - the List resource is a [Generic List Resource](/#generic-list-resources) now
> - single Invites are their own resource
> - single Invites can be edited with permissions and groups

## Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
| invite| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The invite codes | No |
|permissions   |Array[String]|[Shiro](https://www.npmjs.com/package/shiro-trie) permission string|Permissions that are assigned to this invite. |Yes|
|groups        |Array|objects containing `name`, and `groupID` (not `permissions`!)| Groups this invite is assigned to. | Yes|
|email         |String|Email address|Email address of the user that was invited. | Yes |


## Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Invite](#)| The resource itself | GET, PUT |
| collection    | [Invite List](#list)| List of all available invites | GET, POST |
| ec:auth       | [Entry Point](./auth/#entry-point)| Account Server Entry Point | GET |

## List

The Invite List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Invite Resources.


## Possible Actions

## Read

To read a single Invite Resource, clients may perform GET on an `ec:invite` relation.

To read the Invite List Resource, clients may perform GET on a `ec:invites` relation or on the `collection` relation of a single Invite resource.

In both cases, the success status code is **200 OK.**

## Create

To create new invite(s), clients may perform a POST on `ec:invites`. The JSON Schema for creating new Invites is [https://schema.entrecode.de/schema-acc/invites-template-post](https://schema.entrecode.de/schema-acc/invites-template-post). It may be an empty body, or a JSON containing a `count` number. An empty body is equivalent to using `"count": 1`. It indicates how much new invites will be generated. It is also possible to set `email`, `permissions` and `groups` to set those for the newly generated invites. Note: When providing `email` property when creating an invite, the `count` property is ignored and only one invite is created – this invite will be sent to the provided email address.

The success status code is **201 Created** and the response body is the Invites Resource containing the new invite(s).

## Edit

To update an existing Invite Resource, clients may perform a PUT on `ec:invite` or `self` at a single Invite Resource. The JSON Schema for editing a Invite is [https://schema.entrecode.de/schema-acc/invite-template-put](https://schema.entrecode.de/schema-acc/invite-template-put). 

Editable fields are the `email` field, the `permissions` array, and the `groups` array. Note that the elements of the `groups` array are expected to be objects with a `groupID` property. The response will also contain the group's `name` property.

The success status code is **200 OK** and the response body is the updated single Invite resource.

## Delete

Since version 0.20.0 of Account Server it is possible to delete Invite Resources. For this you will need to send a DELETE on `ec:invite` or `self` at a single Invite Resource.

Additionally, Invites Resources get invalidated on usage and will not be visible through this resource anymore.
