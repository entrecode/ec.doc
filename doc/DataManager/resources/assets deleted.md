### [Resource ec:assets/deleted](id:assets-deleted)
Collection of deleted assets in Data Manager.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of deleted assets.|GET|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager|The data manager these assets belong to.|GET,PUT|No.|
|ec:assets/deleted/by-id |Retrieves an individual deleted asset resource based on the specified identifier. |GET|Yes. Requires the assetID.


##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:asset/deleted` Resources.