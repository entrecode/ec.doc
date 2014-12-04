### Entry Point: [ec:datamanagers](id:datamanagers)
When accessing the Entry Point, the list of available data managers is returned.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |Collection of data managers.|GET, POST|No.          |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|next          |The next page of items in a collection. If there are no further pages of items, this link is not returned in the response.|GET|No.|
|prev          |The previous page of items in a collection. If there are no previous pages of items, this link is not returned in the response.|GET|No.|
|first|The first page of items in a collection. This link is returned only when on pages other than the first one.|GET|No.
|ec:datamanager/by-id |Retrieves an individual data manager resource based on the specified identifier. |GET|Yes. Requires the dataManagerID.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|count         |Number of items included in this page|
|total         |Total number of items |

##### Embedded
`ec:datamanager` Resources.

#### POST ec:datamanagers
To create a new Data Manager Space, POST to the collection resource with the following template:

##### Properties
| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|

##### Output

* **201 created** if everything went well. The response is the new `ec:datamanager` resource.
