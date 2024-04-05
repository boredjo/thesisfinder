

# Sonsoring

Sponsorships are not unique, one use can sponsor an idea multiple times

## Sponsor an idea

To sponsor an idea, you need to send a post request with the sponsor amount an optional description and deadline 

> You need to be authentiacted  to perform this action

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

## Get Sponsorhip details

> This method requires the sponsorship id to look up the details of the question

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/ideaid' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"id" : "sponosrhip_id",
	"idea": "somehash",
	"author": "anonymous",
	"date_posted": "2024-02-24",
	"deadline": "2025-02-24",
	"description": "some long text",
	"attachments": [],
	"views": 123124,
	"amount": 100.00
}
```

## Get Sponsorships from User

> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/user/' \
--header 'Token: tokentokentoken'
```

This endpoint will return all the ideas claimed by the authenticated user.

## Get Sponsorships from any User

> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/user/username' 
```

This endpoint will return all the ideas claimed by the authenticated user.


## Get Sponsorhips for ides

```shell
curl --location --request GET 'https://api.thesisfinder.com/sponsor/idea/ideaid' 
```
> The above command returns JSON that contains a list of five results structured like this:

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


## Delete Sponsoring

To delete a sponsoring, simply sent an authenticated `DELETE` request

> You need to be authentiacted as the author to perform this action

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/sponsor/sponsorship_id' \
--header 'Token: tokentokentoken' 
```

