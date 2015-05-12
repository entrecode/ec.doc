#### Resource: ec:asset/file
This subresource is included in the ec:api/asset resource.

##### Properties
| Name         | Description     |
|--------------|-----------------|
|mimetype      |The MIME Media type ([RFC 2046](http://tools.ietf.org/html/rfc2046)) for this file 
|url           |The URI ([RFC 3986](https://tools.ietf.org/html/rfc3986)) of the file for retrieval
|size          |Size of the file in Bytes
|resolution    |JSON object with additional metadata for this file. For image assets, it will contain properties like `width` and `height` to indicate the image resolution.
|locale        |Locale of the asset file in [RFC5646](http://tools.ietf.org/html/rfc5646) Syntax (`en-US`, `de-DE`, …)
|created       |Timestamp of the creation of the file as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|
|modified       |Timestamp of the last modification of this file as ISO-8601 formatted UTC Date String (YYYY-MM-DDTHH:mm:ss.sssZ, [RFC 3339](http://tools.ietf.org/html/rfc3339))|