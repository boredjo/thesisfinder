# Idea

Ideas have a hash value as id. The title has to be unique and not longer than 200 characters. An Idea can have up to 5 tags. There is also the user name of author attached to it.

## Get Featured Ideas

> you can send this anonmously

```shell
curl --location --request GET 'https://data.thesisfinder.com/idea/featured/n' 
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
> To get more details send a request to `https://data.thesisfinder.com/idea/details`

This endpoint gives a list 5 questions, meant to be displayed at the featured idea page

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
n | int | The number of ideas requested. This can be omitted. The default is 5.
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
author | str | The user name of the author of the idea. This can be `anonymous`
date_posted | str | UTC Timestamp of when the idea was posted
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.

## Search for ideas

> you can send this anonmously

```shell
curl --location --request GET 'https://data.thesisfinder.com/idea/search/query' 
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
> To get more details send a request to `https://data.thesisfinder.com/idea/details`


### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
query | str | The string, for which ideas with similar titles will be found.
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
author | str | The user name of the author of the idea. This can be `anonymous`
date_posted | str | UTC Timestamp of when the idea was posted
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.

<!-- ### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | not unique | The user name or email are already taken.
401 | no auth | The authorized user does not have the permisson for this action. -->

## Idea Details

> This method requires the idea id to look up the details of the question

```shell
curl --location --request GET 'https://data.thesisfinder.com/idea/details/id' 
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

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
author | str | The user name of the author of the idea. This can be `anonymous`
date_posted | str | UTC Timestamp of when the idea was posted.
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.
description | str | Long text that descrbes the idea in detail.
attachments | str[] | File names of attachments that can be obtained using `/attachments/idea/`
views | int | This shows the number of detail request sent for this idea

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | The given idea id does not exist.

## Get Recomendations

<aside class="notice">
This endpoint is not implemented.
</aside>

> you can send this anonmously

```shell
curl --location --request GET 'https://data.thesisfinder.com/idea/recommend/ideaid' 
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
> To get more details send a request to `https://data.thesisfinder.com/idea/details`

This endpoint gives a list 5 questions that are most closly related to the given idea.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
ideaid | str | Id of the idea, for which recommendations will be generated.
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
author | str | The user name of the author of the idea. This can be `anonymous`
date_posted | str | UTC Timestamp of when the idea was posted
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.


## Post an Idea
<aside class="notice">
This endpoint uses the auth middleware. Request can be send anonymously.

This endpoint parses for `application/json`.
</aside>

> This is how a post request should be structured

```shell
curl --location 'https://data.thesisfinder.com/idea/' \
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

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The unique ID of the idea, which is a hash value of the time posted
title | str | The title of the idea. The tiltle can be no longer than 200 characters
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.
description | str | Long text that descrbes the idea in detail.


### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | not unique | The idea title is already taken.
422 | invalid tag | One or more of the tags provided are not valid


## Update an Exsiting Idea

<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.

This endpoint parses for `application/json`.
</aside>

> You need to be authentiacted as the author to perform this action

```shell
curl --location 'https://data.thesisfinder.com/idea/id' \
--header 'Content-Type: application/json' \
--data-raw '{
	"tags":["Urban Agriculture", "Sustainability", "Food security"],
	"description": "some long text",
}'
```

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The unique ID of the idea, which is a hash value of the time posted
tags | str[] | Tags accociated with the idea. There can be no more than 5 tags.
description | str | Long text that descrbes the idea in detail.

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | The given idea id does not exist.
422 | not unique | The user name or email are already taken.
422 | invalid tag | One or more of the tags provided are not valid
401 | no auth | The authorized user does not have the permisson for this action.

## Delete an Exsiting Idea

<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.
</aside>

> You need to be authentiacted as the author to perform this action

```shell
curl --location --request DELETE 'https://data.thesisfinder.com/idea/id' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken'
```

This will not delete the idea, but only make it invisible

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
id | str | The unique ID of the idea, which is a hash value of the time posted

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no idea | The given idea id does not exist.
401 | no auth | The authorized user does not have the permisson for this action.

## Get all valid tags

<aside class="notice">
This endpoint is not implemented.
</aside>

```shell
curl --location --request DELETE 'https://data.thesisfinder.com/idea/tags' \
```

This will return a list of all valid tags