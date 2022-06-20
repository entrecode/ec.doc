# Errors

Error responses across all APIs are always returned with an HTTP status code ≥ 400, i.e. 400, 401, 403, 404, 429, 500.
The media type is `application/problem+json`. Error responses comply to the [Problem Details IETF Draft](http://tools.ietf.org/html/draft-nottingham-http-problem-07) *and* to [HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06).
 
JSON Schema: [https://schema.entrecode.de/schema-acc/error](https://schema.entrecode.de/schema-acc/error)

The following properties are REQUIRED:
 
* `status` is the HTTP status code of the error and the same status code as the actual HTTP response
* `code` is a four digit error code as defined below
* `title` is the generic, short description of the error code
* `type` is the URL to the description of the error code
* `_links` is a HAL link object that includes `up` and `describedby` link relations; `describedby` is the same URL as `type`.
 
The following properties are OPTIONAL:
 
* `detail` is the name of the object the error occurred on (e.g. the invalid property)
* `verbose` any additional information about the error
* `_embedded` is a HAL embed object that MAY include `error` sub-resources.
 
Error sub-resources can be used to indicate more errors that occurred or would have occurred, if the enclosing *main* error would not have occurred.
Error sub-resources have a subset of the properties described above: `code`, `title`, `type` and `detail`.

### Example

    {
        "status": 400,
        "code": 2202,        
        "title": "Missing property in query string",
        "type": "https://entrecode.de/doc/errors/2202",
        "detail": "count",
        "_links": {
            "up": {
                "title": "Data Manager Home Page",
                "href": "https://datamanager.entrecode.de" 
            },
            "describedby": {
                "title": "Error Description",
                "href": "https://entrecode.de/doc/errors/2202"
            }
        }
        "_embedded": {
            "error": {
                "code": 2201,
                "title": "Missing property in JSON Body",
                "type": "https://entrecode.de/doc/errors/2201",
                "detail": "property"
            }
        }
    }
    
    

## Error Codes
Error codes are 4 digit decimal codes.
They consist of two parts. The first number identifies the system the error occurred in, the last three numbers identify the error, they are the actual error codes.
Examples:

**2100:** A requested resource in the Datamanager does not exist.

**2202:** A request to a resource in the Datamanager misses a required property in its query string. The detail field of the error response will indicate which property.

**3000:** An internal error occurred in the Appserver, probably a server-side bug.
 
 
### First Number: System
 
|Code|System|
|---|---|
| 1xxx | Account Server |
| 2xxx | Data Manager |
| 3xxx | App Manager |
 
More Codes may be added in the future.
 
### Second Number: Error Code

The actual error code (`code`) is partitioned in error types (bold in the table below).
The `detail` field includes further information about the subject of the error.
The `verbose` field may be used for further information what is actually wrong with the subject in `detail`.
 
| Code | Description | Detail | Verbose | HTTP Status Code |
|--------|------|------|------|-----|
| **000** | **Internal Error.** No further information disclosured to client. | | | 500 |
| **1xx** | **Generic Error** | | | |
| 100  <a name="error-100"></a>  | Resource not found |  |  | 404|
| 101  <a name="error-101"></a>  | No resource entity matching body property filter found | the body property that did not produce a match |  | 404|
| 102  <a name="error-102"></a>  | No resource entity matching query string filter found | the query string property that did not produce a match |  | 404|
| 110  <a name="error-110"></a>  | Method not allowed | the request method that is not allowed | | 405 |
| 150  <a name="error-150"></a>  | Error in remote API | description of the error | the Error returned from the remote API | 400 |
| **2xx** | **Syntax Error** |  |  | |
| 200  <a name="error-200"></a>  | Missing body |  |  | 400|
| 201  <a name="error-201"></a>  | Missing property in JSON body | the property that is missing |  | 400|
| 202  <a name="error-202"></a>  | Missing property in query string | the property that is missing |  | 400|
| 203  <a name="error-203"></a>  | Missing file in upload | | | 400 |
| 204  <a name="error-204"></a>| Missing HAL link or embed in JSON body | the relation that is missing |  | 400|
| 211  <a name="error-211"></a>  | Invalid format for property in JSON body | the property with an invalid format |  | 400|
| 212  <a name="error-212"></a>  | Invalid format for property in query string | the property with an invalid format |  | 400|
| 213  <a name="error-213"></a>  | Invalid file format in upload | the recognized mime type that is not allowed | | 400|
| 214  <a name="error-214"></a>| Invalid linked or embedded HAL resource in JSON body, or link not found | the relation that is invalid |  | 400|
| 215  <a name="error-215"></a>  | Resource cannot be sorted after given property | the property that is not allowed for sorting |  | 400|
| 216  <a name="error-216"></a>  | Resource cannot be filtered with given property | the property that is not allowed for filtering |  | 400|
| 217  <a name="error-217"></a>  | Resource cannot be range-filtered with given property | the property that is not comparable |  | 400|
| 251  <a name="error-251"></a>  | Password is too short (on registration, only 1251 is defined) |  |  | 400|
| 252  <a name="error-252"></a>  | Unmatched validation error | TinyValidator4 Error Code with message |  | 400|
| 253  <a name="error-253"></a>  | Invalid asset to merge |  |  | 400 |
| 254  <a name="error-254"></a>  | Exceeded maximum levels for nested request. | Number of maximum levels |  | 400 |
| 255  <a name="error-255"></a>  | Could not get nested resources. | entryID which produced the error |  | 400 |
| 256  <a name="error-256"></a>  | Could not create download file. | detailed error response |  | 400 |
| **3xx** | **Semantics Error** |  |  | |
| 311  <a name="error-311"></a>| Invalid value for property in JSON body | the property with an invalid value | | 400 |
| 351  <a name="error-351"></a>  | eMail address is unavailable (on registration and email change, only 1351 is defined) |  |  | 403|
| 352  <a name="error-352"></a>  | Cannot delete openID connection (only 1352 is defined) |  |  | 403|
| 353  <a name="error-353"></a>  | Duplicate model/assetgroup in same data manager (only 2352 is defined) |  |  | 403|
| 354  <a name="error-354"></a>  | Cannot delete Model, has entries (only 2354 is defined)|  |  | 403|
| 355  <a name="error-355"></a>  | Cannot delete Model, mandatory model (only 2355 is defined)|  |  | 403|
| 356  <a name="error-356"></a>  | Cannot change Model, has Entries. (only 2356 is defined) | More detailed description of error | Affected Field | 403|
| 357  <a name="error-357"></a>  | Model must support default locale (only 2357 is defined)| Affected modelID |  | 400|
| 358  <a name="error-358"></a>  | Unsupported locale (only 2358 is defined)| Affected modelID |  | 400|
| 359  <a name="error-359"></a>  | Violates unique constraint (only 2359 is defined)| title of violating field  |  | 400|
| 360  <a name="error-360"></a>  | Cannot delete entry. Referenced as required. (only 2360 is defined)| entryID holding the reference |  | 400|
| 361  <a name="error-361"></a>  | Cannot change entry. Read Only. (only 2361 is defined)| | | 403|
| 362  <a name="error-362"></a>  | Cannot change entry. Reference not allowed due to type validation. (only 2362 is defined) | | | 400|
| 363  <a name="error-363"></a>  | Cannot change Model, edit of mandatory/unmutable field. (only 2363 is defined) | More detailed description of error | Affected field | 403|
| 364  <a name="error-364"></a>  | Cannot change Model, reserved field title. (only 2364 is defined) | Field title | | 400|
| 365  <a name="error-365"></a>  | Cannot change Model, duplicate model title. (only 2365 is defined) | Model title | | 400|
| 366  <a name="error-366"></a>  | Duplicate field name in model. | Field title | | 400 |
| 367  <a name="error-367"></a>  | Field cannot be unique and localizable. | Field title | | 400 |
| 368  <a name="error-368"></a>| Field of type boolean must be required. | Field title | | 400 |
| 369  <a name="error-369"></a>  | Title field not a field in the model. | Title field | | 400 |
| 370  <a name="error-370"></a>  | Cannot delete Resource. Is used. | | | 403 |
| 371  <a name="error-371"></a>  | Cannot change entry. Reference not found. (only 2371 is defined) | | | 400|
| 372  <a name="error-372"></a>  | Required field must have a default value set. | Field title | | 400 |
| 373  <a name="error-373"></a>  | Other parallel request already added tag(s) | | | 400 |
| 374  <a name="error-374"></a>  | Cannot export datamanager. Required field has no default value. | model title | field title | 400 |
| 375  <a name="error-375"></a>  | A duplicate asset already exists in this AssetGroup. Set `ignoreDuplicates` flag to ignore. No assets were uploaded. | model title | field title | 400 |
| 376  <a name="error-376"></a>  | Cannot export datamanager. Required field has no default value. | model title | field title | 400 |
| **4xx** | **Rights Management Error** |  |  | |
| 400  <a name="error-400"></a>  | Missing Access Token |  |  | 401|
| 401  <a name="error-401"></a>  | Invalid Access Token |  |  | 401|
| 402  <a name="error-402"></a>  | Outdated Access Token |  |  | 401|
| 403  <a name="error-403"></a>  | Invalid Password | the email address that attempted the login | Timestamp until login is locked for this email address | 401|
| 404  <a name="error-404"></a>  | Account not found (unknown email address) |  |  | 404|
| 410  <a name="error-410"></a>  | Insufficient rights to access the requested resource | The rejected permission |  | 401|
| 411  <a name="error-411"></a>  | Insufficient rights to access the requested resource with this method |  |  | 405|
| 444  <a name="error-444"></a>  | Denied because of stupidity |  |  | 403|
| 451  <a name="error-451"></a>  | Too many wrong login attempts (on login, only 1451 is defined) |  |  | 429|
| 452  <a name="error-452"></a>  | User blocked (on login and internal account API, only 1452 is defined) |  |  | 403|
| 453  <a name="error-453"></a>  | Invalid invite (on registration, only 1453 is defined) |  |  | 403|
| 460  <a name="error-460"></a>  | Generic OAuth Error | | more information | 400 |
| 461  <a name="error-461"></a>  | Facebook OAuth Request failed | Facebook Error Code | Facebook Error Message | 400|
| 462  <a name="error-462"></a>  | Facebook API call failed to receive eMail address | | more verbose Error Message | 400|
| 470  <a name="error-470"></a>  | Target resource does not fulfill permission policy conditions | | | 403 |
| 471  <a name="error-471"></a>  | Property cannot be written due to permission policy restrictions | the property that is not allowed | | 403 |
| 472  <a name="error-472"></a>  | Error while processing asset file.| The original error message | | 400 |
| **5xx** | Plan error (not in Accountserver, only 25xx and 35xx are defined) |  |  | |
| 500  <a name="error-500"></a>  | Missing plan for this product | the product that is not included in the current plan |  | 403|
| 510  <a name="error-510"></a>  | Insufficient plan for this product | the product whose limit is exceeded in the current plan |  | 403|
| 511  <a name="error-511"></a>  | Insufficient plan for creation | the product whose limit is exceeded in the current plan |  | 403|
| **9xx** | **Other** |  |  | |
 
 
---
###*Guidelines for definition of new error codes*##
* *a suitable HTTP error code should still be used*
* *codes should be added to the defined error types (1xx-5xx)*
* *codes are logically sub-partitioned in groups of ten*
* *codes above x5x should be used for very (resource- or system-)specific errors*

