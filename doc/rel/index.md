# Link Relations

Additional to the official link relations defined by [IANA](http://www.iana.org/assignments/link-relations/link-relations.xhtml), entrecode uses the following:

| Link Relation                 | Description                                    |
|-------------------------------|------------------------------------------------|
|[account](./rel/account)       |A single entrecode account|
|[account/change-email-verification](./rel/account/change-email-verification)|Verify an eMail change|
|[account/token](./rel/account/token)|A single token assigned to an [account](./rel/account) |
|[account/tokens](./rel/account/tokens)|List of tokens assigned to an [account](./rel/account) |
|[accounts](./rel/accounts)     |List of entrecode accounts|
|[asset](./rel/asset)           |A Data Manager Asset|
|[asset/deleted](./rel/asset/deleted)|A deleted Data Manager Asset|
|[asset/file](./rel/asset/file) |File of a Data Manager Asset|
|[assets/deleted](./rel/assets/deleted)|List of deleted Data Manager Assets|
|[assets](./rel/assets)         |List of Data Manager Assets|
|[auth/email-available](./rel/auth/email-available)|Check availability of eMail Addresses for Registration|
|[auth/email-verification](./rel/auth/email-verification)|Verify an eMail Address|
|[auth/login](./rel/auth/login) |Log in with an account|
|[auth/logout](./rel/auth/logout)|Log out with an account|
|[auth/oauth](./rel/auth/oauth) |Register or Log in using OpenID Connect (OAuth)|
|[auth/password-reset](./rel/auth/password-reset)|Reset a password for an account|
|[auth/register](./rel/auth/register)|Register for an account|
|[datamanager](./rel/datamanager)|Single Data Manager|
|[datamanagers](./rel/datamanagers)|List of Data Managers|


