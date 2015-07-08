### [Resource: accounts](id:accounts)
List of accounts. Only accessible as privileged user.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of accounts.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:account/by-id |Retrieves an individual account resource based on the specified identifier. |GET|Yes. Requires the accountID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
account Resources with the properties `accountID`, `created`, `email`, `language`, `state`, `isPrincess`

*To also retrieve the `hasPassword` and `openID` fields, follow the `self` link to access the full resource.*