# Single CodeSource

The single CodeSource Resource represents a file source that is needed for [Deployments](./deployment/#list) of a [Platform](./platform). 
It has a specific [CodeSourceType](#codesource-types) that defines the behavior when deploying.

The JSON Schema is [https://entrecode.de/schema/codesource](https://entrecode.de/schema/codesource).

# Properties

| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|codeSourceID| String | Version 4 UUID ([RFC 4122](http://tools.ietf.org/html/rfc4122))| The unique identifier for a CodeSource | No. Gets generated on creation. |
|codeSourceType| String | valid [codeSourceType](#codesource-types) | Specifies the type of the CodeSource. | Yes. |
|config| JSON Object | valid against the JSON Schema of the selected codeSourceType | codeSourceType-dependent configuration options. | Yes. |

# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [CodeSource](#)| The resource itself | GET, PUT, DELETE |
| collection    | [CodeSource List](#list)| List of all available CodeSources | GET, POST|
| ec:app | [App](./app/) | The app this codeSource is corresponding to. | GET, PUT, DELETE |
| ec:app/platform| [Platforms](./platform/) | Platforms that use this codeSource. (optional) | GET, PUT, DELETE |

*Note that a codeSource cannot be deleted if it is used in at least one platform.*

# List

The CodeSource List Resource is a [Generic List Resource](/#generic-list-resources) with embedded CodeSource Resources.

# Possible Actions

## Read

To read a single CodeSource Resource, clients may perform GET on a `ec:app/codesource` relation.

To read the CodeSource List Resource, clients may perform GET on a `ec:app/codesources` relation or on the `collection` relation of a single CodeSource resource.

In both cases, the success status code is **200 OK.**

## Create

To create a new CodeSource Resource, clients may perform a POST on `ec:app/codesource` (the list resource). The JSON Schema for creating a new CodeSource is [https://entrecode.de/schema/codesource-template](https://entrecode.de/schema/codesource-template). 

The success status code is **201 Created** and the response body is the newly created single CodeSource resource.

## Edit

To update an existing CodeSource Resource, clients may perform a PUT on `ec:app/codesource` or `self` at a single CodeSource Resource. The JSON Schema for editing an CodeSource is [https://entrecode.de/schema/codesource-template](https://entrecode.de/schema/codesource-template). 

The success status code is **200 OK** and the response body is the updated single CodeSource resource.

## Delete

To delete an existing CodeSource Resource, clients may perform a DELETE on `ec:app/codesource` or `self` at a single CodeSource Resource. This is only possible if the codeSource is not used in any platform (would trigger an error 403 with code 3370).

The success status code is **204 No Content** with an empty response body.


# CodeSource Types
All CodeSource types SHOULD contain a required property `hexColor` in the config_schema. `hexColor` SHOULD be the regex format `^#[A-Fa-f0-9]{6}$` (`#d23738`).

## remoteGit

Pulls a remote Git Repository.

Expected configuration: a JSON object with the key `giturl` that contains a valid Git URL and the key `hexColor` with the desired color shown in the editor frontend (format: `#d23738`).

For private repositories, SSH can be used. The following public Key has to be allowed access:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAEAQC6zr+84QyFf3Rbpv18VQHuwqk5PDMw/Uq1Ek9LooUEErRaecj21SXUaElEai9U+7OfTguIgDGS4YGOV4ya5zKh/Ja7mOhErgLIKGRaA61POGZ4gPnI5IjPak3U4oEW8PLmNPbtBkTMJxmSL7X3LTWm3iSIhUUeZ0tPRhnoBtNpAN58QINt5mhZ/+Hzm62j69ezvToBlIq2uf1AM9rRcN/BY1FE0WAVtiJG2ABRUELc7C2wvw68MWHOUEX1fRpXr82fm9orBtMg2kV7E/Wif6EcoGh+1D18WJa4jnXR+ChYGb2/KketFNoo1lwvpv0AGA3TZKsgntU9V0KU/LzJFbv1jK72IVwSQO6yuextMPIctq1VuGowAmPznap3VMHQ5qyR4fDNbg0kJF6wSGUGXsnc7zBVfS9hl1EdIeQTI/DSYnMJEKwZnfrcrMKZYZ0jc3lVU9yZWFuF6fyYqVmiF8GO0leCT2EBOl6sztNO0etG8EQ0NmtQRr5RndaOtVrcxrkxul8GDRqPtqVn43nkpa4UmqXn259jkr78fkCRAS9UCfPjOAkpeY8GWxZ1K40gFIjYnQ3PRx7DnQyqOkTDWMCzErxtI6qup9TK+0NZfvcEM3+FybG77/3e+j3oN5cKASJdk3ikbRPPbcUY2UQDWaG+XrG8KaAAaHtIjmAkoioCPQkpwPlndzSVioiMUQhMJdpn+Wrz29IAsB6Fm/oQE45+epGyc6GxvnrVojabklLD3yKkI9hD8qkeAddSJeMfOfvcJLtQUOQKUNmuxMjBJdczvpiU6A+QeYVpn+JcAfAneMjjsO3otCVIdFPpOQWy2/JNtb26D97fRaMs9AkpgNPG44wUcZBVA+4+M7U/+E1F9/qDy2wyYB71JDOVTle4+h6j5MbOtueSNLDBSct3PrBCORpTytSBiqpFb6MqdLULoTv4b331w3Obocc25mbDbStvVv3C6E61BxDVehWq+CyuZKaviLBVq7ryIzbAd23ijnEv8at3BpMpdivpxA/nx3nD+Hran6FDvh6cQBQz4mVVaGJ8t8AHxbARsIINbYVkD2vYfguMH8ECWVkv6jXSk1xTganAUSUpb590RHtOt2VwioYuovS/EAWVxvEhpCLT/VO2R5J/tT61Ad4dMaLBBf9jB1CXn71RIisi9/5fZaEG6wFmEy5fD1trlEeoh2869bAWmC7t2cKKYVamJF8wRjjV4aRitOZnFD7V6vOjqJaHkQNNJGwwEWoFix9mg2v3J4oW6z4AnDPZ+EGzwKZJsGsZFjIcOV67A7NRzILotAbxD/bfpf1zfZyXcB5gUkUFb2Ln77uKsalNWqOAoGDf2PSx6uYoXOi0QY64Rpnmigml ec.AppServer

```
