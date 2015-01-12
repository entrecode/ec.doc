### [Resource: ec:datamanager](id:datamanager)
A single Data Manager Space.

##### Links
| Relation     | Description     | Methods     | Templated     |
|--------------|-----------------|-------------|---------------|
|self          |An entrecode Data Manager Space.|GET, PUT  |No.            |
|curies        |[CURIE](http://www.w3.org/TR/curie/) links. | GET | Yes.|
|collection    |Collection of Data Managers. Includes this Data Manager. |GET, POST|No.|
|ec:assets     |Collection of assets associated with this Data Manager Space. |GET, POST|No.|
|ec:assets/deleted|Collection of deleted assets associated with this Data Manager Space. |GET|No.|
|ec:models     |Collection of models associated with this Data Manager Space. |GET, POST|No.|
|ec:customer   |The customer this Data Manager Space belongs to.| GET | No. |

##### Properties
| Name         | Description     |
|--------------|-----------------|
|dataManagerID |The unique identifier for this Data Manager Space as Version 4  UUID ([RFC4122](http://tools.ietf.org/html/rfc4122)).|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|rights        |Array of available rights (`manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`). Not included rights are not available.
|created       |Timestamp of the creation of this Data Manager Space as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|locales       |Array of available locales ([RFC4646](https://tools.ietf.org/html/rfc4646)) in this Data Manager Space.|
|defaultLocale |The default locale of this Data Manager Space. Included in `locales`.|

#### PUT ec:datamanager

*TBD!*

Title and description of the Data Manager can be changed, as well as rights. Locales can be added or deleted and a defaultLocale can be set.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|title         |A string title for this Data Manager Space.|
|description   |A longer description for this Data Manager Space.|
|rights        |Array of rights (`manageRights`, `editModel`, `editEntries`, `editAssets`, `manageAPIs`). 
|*tbd* locales, defaultLocale|

##### Output

* **200 ok** if everything went well