# Sonsoring

Sponsorships are not unique, one user use can sponsor an idea multiple times

## Sponsor an idea

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly

This endpoint parses for `application/json`
</aside>

To sponsor an idea, you need to send a post request with the sponsor amount an optional description and deadline 


```shell
curl --location 'https://api.thesisfinder.com/sponsor/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken' \
--data-raw '{
	"idea": "someideahash"
	"amount": 100.00,
	"description": "please focuse more on the ... aspect of ..."
	"deadline": "2026-02-24",
}'
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"id" : "sponsorship_id"
}
```

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
idea | str | The id hash of the idea that is sponsored
amount | float | The amount of the price money in USD
description | str | This text can be used to describe the desired result in more detail
deadline | str | Date when the sponsoring expires


### Errors
Code | Message | Explaination
--------- | ------- | -----------
401 | no auth | The authorized user does not have the permisson for this action.
422 | not unique | The description already exists (to be removed)


## Get Sponsorhip details

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/sponsorshipid' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"id" : "sponosrhip_id",
	"idea": "somehash",
	"author": "anonymous",
	"date_posted": "2024-02-24",
	"description": "some long text",
	"deadline": "2025-02-24",
	"attachments": [],
	"views": 123124,
	"amount": 100.00
}
```

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
sponsorshipid | str | The id hash of the sponsorship used for the query
id | str | The id hash of the sponsorship
idea | str | The id hash of the idea that is claimed claimed
author | str | User name of the user who posted the sponsorship
date_posted | str | Timestamp of when the sponsorship was posted
description | str | This text can be used to describe the desired result in more detail
deadline | str | Date when the sponsoring expires
attachments | str[] | File names of attachments that can be obtained using `/attachments/sponsor/`
views | int | Number of times this sponsorship has been shown
amount | float | The amount of the price money in USD


### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no sponsor | There is no sponsorship accoiated with this id


## Get Sponsorships from User

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly
</aside>


```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/user/' \
--header 'Token: tokentokentoken'
```
> The above command returns JSON that contains a list of results structured like this:

```json
{
	"sponorships":[
		{
		"id" : "sponosrhip_id",
		"idea": "somehash",
		"author": "anonymous",
		"date_posted": "2024-02-24",
		"deadline": "2025-02-24",
		"amount": 100.00
		},
		...
	]
}
```

This endpoint will return all the ideas claimed by the authenticated user.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The id hash of the sponsorship
idea | str | The id hash of the idea that is claimed claimed
author | str | User name of the user who posted the sponsorship
date_posted | str | Timestamp of when the sponsorship was posted
deadline | str | Date when the sponsoring expires
amount | float | The amount of the price money in USD


## Get Sponsorships from any User


```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/user/username' 
```
> The above command returns JSON that contains a list of results structured like this:

```json
{
	"sponorships":[
		{
		"id" : "sponosrhip_id",
		"idea": "somehash",
		"author": "anonymous",
		"date_posted": "2024-02-24",
		"deadline": "2025-02-24",
		"amount": 100.00
		},
		...
	]
}
```

This endpoint will return all the ideas claimed by the authenticated user.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
username | str | User name of the author used for the query
id | str | The id hash of the sponsorship
idea | str | The id hash of the idea that is claimed claimed
author | str | User name of the user who posted the sponsorship
date_posted | str | Timestamp of when the sponsorship was posted
deadline | str | Date when the sponsoring expires
amount | float | The amount of the price money in USD

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no user | There is no user with this username


## Get Sponsorhips for ides

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/idea/ideaid' 
```
> The above command returns JSON that contains a list of results structured like this:

```json
{
	"sponorships":[
		{
		"id" : "sponosrhip_id",
		"idea": "somehash",
		"author": "anonymous",
		"date_posted": "2024-02-24",
		"deadline": "2025-02-24",
		"amount": 100.00
		},
		...
	]
}
```

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
ideaid | str | The id hash of the idea for which sponsorships should be returned
id | str | The id hash of the sponsorship
idea | str | The id hash of the idea that is claimed claimed
author | str | User name of the user who posted the sponsorship
date_posted | str | Timestamp of when the sponsorship was posted
deadline | str | Date when the sponsoring expires
amount | float | The amount of the price money in USD

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | There is no idea with this id


## Delete Sponsoring

<aside class="notice">
This endpoint uses the auth middleware. Request cannot be send anonymouly
</aside>

To delete a sponsoring, simply sent an authenticated `DELETE` request

> You need to be authentiacted as the author to perform this action

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/sponsor/sponsorship_id' \
--header 'Token: tokentokentoken' 
```
### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
sponsorshipid | str | The id hash of the sponsorship used for the query


### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no sponsor | There is no sponsorship accoiated with this id