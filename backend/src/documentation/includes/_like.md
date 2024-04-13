# Like

<aside class="notice">
This entire route is not implemented.
</aside>

Likes are used for the email newsletter.

## Like an idea

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly

This endpoint parses for `application/json`
</aside>


> You need to be authentiacted to perform this action

```shell
curl --location  'https://api.thesisfinder.com/like/' \
--header 'Token: tokentokentoken' \
--data-raw '{
		"idea": "some idea hash"
}'
```

> The above command returns JSON structured like this:
```json
{
	"like": True
}
```

This will change the like status. When the user already likes the idea, then the like is removed, else the like is placed. The endpoint will return the current status.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
idea | str | The id hash of the idea that will be claimed

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | There is no idea with the given id.
401 | no auth | The authorized user does not have the permisson for this action.


## Get likes from User

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly
</aside>

```shell
curl --location --request GET 'https://api.thesisfinder.com/like/user/'\
--header 'Token: tokentokentoken' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"likes":[
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

This endpoint will return all the ideas liked by the authenticated user.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
idea | str | The id hash of the idea that is claimed
author | str | The user name of the user that claimed the idea
date_posted | str | Timestamp of when the claim was posted
attachments | str[] | File names of attachments that can be obtained using `/attachments/claim/`



### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no user | There is no user with the given user name.
401 | no auth | The authorized user does not have the permisson for this action.


## Get like status for idea

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly
</aside>


> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/like/ideid' \
--header 'Token: tokentokentoken' \
```

> The above command returns JSON structured like this:
```json
{
	"like": True
}
```

This will change the like status. When the user already likes the idea, then the like is removed, else the like is placed. The endpoint will return the current status.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
idea | str | The id hash of the idea that will be claimed

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | There is no idea with the given id.
401 | no auth | The authorized user does not have the permisson for this action.