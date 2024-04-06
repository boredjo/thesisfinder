# Claim 

Claims are unique, every account can only claim an idea once.

## Claim an idea

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly

This endpoint parses for `application/json`
</aside>


> You need to be authentiacted to perform this action

```shell
curl --location  'https://api.thesisfinder.com/claim/' \
--header 'Token: tokentokentoken' \
--data-raw '{
		"idea": "some idea hash"
}'
```
### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
idea | str | The id hash of the idea that will be claimed

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | not unique | The idea is already claimed by the user.
422 | no idea | There is no idea with the given id.
401 | no auth | The authorized user does not have the permisson for this action.


## Get claims from User

```shell
curl --location --request GET 'https://api.thesisfinder.com/claim/user/username' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"claims":[
		{
			"idea" : "somehash",
			"author": "anonymous",
			"date_posted": "2024-04-24",
			"attachments":[]
		},
		...
	]
}
```

This endpoint will return all the ideas claimed by the authenticated user.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
username | str | The user name, for which the claims will be returned. If ommitted, then the user name provided by the auth token will be used.
idea | str | The id hash of the idea that is claimed claimed
author | str | The user name of the user that claimed the idea
date_posted | str | Timestamp of when the claim was posted
attachments | str[] | File names of attachments that can be obtained using `/attachments/claim/`



### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no user | There is no user with the given user name.


## Get claims from Idea

```shell
curl --location --request GET 'https://api.thesisfinder.com/claims/idea/ideaid' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"claims":[
		{
			"idea" : "somehash",
			"author": "anonymous",
			"date_posted": "2024-04-24",
			"attachments":[]
		},
		...
	]
}
```
### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
ideaid | str | The id hash of the idea that is claimed claimed
idea | str | The id hash of the idea that is claimed claimed
author | str | The user name of the user that claimed the idea
date_posted | str | Timestamp of when the claim was posted
attachments | str[] | File names of attachments that can be obtained using `/attachments/claim/`

## Delete a claim

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly
</aside>

To delete a claim, simply sent an authenticated `DELETE` request

> You need to be authentiacted to perform this action

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/claim/ideaid' \
--header 'Token: tokentokentoken' 
```

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
ideaid | str | The id hash of the idea that is claimed claimed

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no claim | No claim like this exists in the database.

