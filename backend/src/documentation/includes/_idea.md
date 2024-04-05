# Idea

Ideas have a hash value as id. The title has to be unique and not longer than 200 characters. An Idea can have up to 5 tags. There is also the user name of author attached to it.

## Get Featured Ideas

> you can send this anonmously

```shell
curl --location --request GET 'https://api.thesisfinder.com/idea/featured' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"ideas":[
		{
			"id" : "somehash",
			"title": "Exploring Sustainable Urban Agriculture",
			"author": "anonymous",
			"date_posted": "2024-02-24",
			"tags":["Urban Agriculture", "Sustainability", "Food security"]
		},
		...
	]
}
```
> To get more details send a request to `https://api.thesisfinder.com/idea/details`

This endpoint gives a list 5 questions, meant to be displayed at the featured idea page

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
author | str | The user name of the author of the idea. This can be `anonymous`
date_posted | str | UTC Timestamp of when the idea was posted
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | not unique | The user name or email are already taken.
401 | no auth | The authorized user does not have the permisson for this action.

### Idea Details

> This method requires the idea id to look up the details of the question

```shell
curl --location --request GET 'https://api.thesisfinder.com/idea/details/ideaid' 
```
> The above command returns JSON that contains a list of five results structured like this:

```json
{
	"id" : "somehash",
	"title": "Exploring Sustainable Urban Agriculture",
	"author": "anonymous",
	"date_posted": "2024-02-24",
	"tags":["Urban Agriculture", "Sustainability", "Food security"],
	"description": "some long text",
	"attachments": ["filename_a", "filename_b"],
	"views": 123124,
}
```

This will increase the view counter

## Post an Idea

> This is how a post request should be structured

```shell
curl --location 'https://api.thesisfinder.com/idea/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"title": "Exploring Sustainable Urban Agriculture",
	"tags":["Urban Agriculture", "Sustainability", "Food security"],
	"description": "some long text",
}'
```
> The above command returns JSON that contains a the idea id:

```json
{
	"id" : "somehash"
}
```

This endpoint registers a new idea, which will be associated with the user authenticated. The return will be the idea id. An idea posted anonymously cannot be edited anymore.


## Update an Exsiting Idea

> You need to be authentiacted as the author to perform this action

```shell
curl --location 'https://api.thesisfinder.com/idea/ideaid' \
--header 'Content-Type: application/json' \
--data-raw '{
		"title": "Exploring Sustainable Urban Agriculture",
	"tags":["Urban Agriculture", "Sustainability", "Food security"],
	"description": "some long text",
}'
```


You can only update Title, Description, and Tags

## Delete an Exsiting Idea

> You need to be authentiacted as the author to perform this action

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/idea/ideaid' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken'
```

This will not delete the idea, but only make it invisible