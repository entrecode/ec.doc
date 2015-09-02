# Single Tag 
Tag in a Data Manager for Assets.

The JSON Schema is [https://entrecode.de/schema/tag](https://entrecode.de/schema/tag)

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|tag     | String | a-z 0-9 äüöß _- |The tag name.| Yes |
|count	  |Number| positive Integer |Number of occurences of this tag in the data manager.|No

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [Tag](#)| The resource itself | GET, PUT, DELETE |
| collection    | [Tag List](#list)| List of all available Tags | GET|

# List

The Tag List Resource is a [Generic List Resource](/#generic-list-resources) with embedded Tag Resources.

# Possible Actions

## Read

To read a single Tag Resource, clients may perform GET on a `ec:tag` relation.

To read the Tag List Resource, clients may perform GET on a `ec:tags` relation or on the `collection` relation of a single Tag resource.

In both cases, the success status code is **200 OK.**

Example:

```
{
	"tag": "tagName",
	"count": 3,
	...
}
```

## Create

Tags get created automatically once they get used in an [Asset](./asset/).

## Edit

To update an existing Tag Resource, clients may perform a PUT on `ec:tag` or `self` at a single Tag Resource. 
Only `tag` can be set.

The success status code is **200 OK** and the response body is the updated single Tag resource.

## Delete
To delete a Tag, clients may perform a DELETE on `ec:tag` or `self` at a single Tag Resource. This also removes the tag from all assets.

The success status code is **204 No Content** with an empty response body.
