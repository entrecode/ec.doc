# App Types

The Types Resource indicates which CodeSource-, DataSource-, Target- and Platform-Types are available.

The JSON Schema is [https://entrecode.de/schema/app-plugin-types](https://entrecode.de/schema/app-plugin-types).

# Properties

| Property | Type | Format | Description | Writable |7
|----------|------|--------|-------------|----------|
|platformTypes | Array | | List of available [platformTypes](./platform/#platform-types) | No. |
|codeSourceTypes | Array | | List of available [codeSourceTypes](./codesource/#codesource-types) | No. |
|dataSourceTypes | Array | | List of available [dataSourceTypes](./datasource/#datasource-types) | No. |
|targetTypes | Array | | List of available [targetTypes](./target/#target-types) | No. |

<h3>Type Arrays Item Properties</h3>
| Property | Type | Format | Description | Writable |
|----------|------|--------|-------------|----------|
|type   | String | | The Type identifier | No. |
|configSchema| JSON | valid [JSON Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04) | Schema of the config property for instances. | No. |
|typeConfig| JSON || arbitrary configuration of the type. | No. |
|restrictToPlatformType| String | a valid [platformType](./platform/#platform-types)| require a specific platform type for instances of this type. (Only on codeSourceTypes, dataSourceTypes and targetTypes) | No. |


# Relations

| Relation Name | Target Resource | Description |Possible Methods |
|---------------|-----------------|-------------|-----------------|
| self          | [App Types](#)| The resource itself | GET, PUT, DELETE |
| ec:apps    | [App List](./app/#list)| List of all available Apps | GET, POST|

# Possible Actions

## Read

This resource can only be read. Just GET the `ec:apps/types` relation.

The success status code is **200 OK.**
