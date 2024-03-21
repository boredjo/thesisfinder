---
title: ThesisFinder API Reference v0.4.0

language_tabs: # must be one of https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
  - shell

toc_footers:
  - <a href='https://github.com/slatedocs/slate'>Documentation Powered by Slate</a>

# includes:
#   - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for thesisfinder.com
---

# Introduction

Thesisfinder API! Work in progress. V0.4.0

# Authentication

> To authorize you need an API token that you can obtain from the `/login/` node

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here" \
  -H "Token: tokentokentoken"
```
> Make sure to replace `tokentokentoken` with your API token.

Thesisfinder API expects token in the format
`Token: tokentokentoken`
The API token also identifies the user. To use the API anonymously, just emit the Authetification completly. Tokens have a life span of 24 hours.

<aside class="notice">
You must replace <code>tokentokentoken</code> with your personal API token obtained from <code>/login/</code>.
</aside>


# Login

## Get Token

```shell
curl --location 'https://api.thesisfinder.com/login/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"user": "username",
	"password": "password"
}'
```
> Make sure to send `Content-Type: application/json`

> The above command returns JSON structured like this:

```json
{
    "token": "tokentokentoken"
}
```

This endpoint is used to retrive the authentication token. This request should be sent anoymouly, that is without authentification in the header.

# User

## Get User Information

> you can send this anonmously

```shell
curl --location --request GET 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken' \
```
> The above command returns JSON structured like this:

```json
{
    "country": "US",
    "email": "",
    "first_name": "Anonymous",
    "last_name": "User",
    "user": "anonymous"
}
```
> This is the anonymous result

This endpoint gives the information about the user identified by the auth token. An endpoint to obtain other useres information (without being logged in as that user) is not planned.

## Post a New User

> this has to be sent anonymously

```shell
curl --location 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"user": "username",
	"first_name": "First Name",
	"last_name": "Last Name",
	"country": "US",
	"email": "email@example.com",
	"password": "password"
}'
```

This endpoint registers a new user with the data base. The username and emails are checked for uniqueness. 

## Update an Exsiting User

> this also uses the POST-method

```shell
curl --location 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken' \
--data-raw '{
	"user": "username",
	"first_name": "First Name",
	"last_name": "Last Name",
	"country": "US",
	"email": "email@example.com",
	"password": "password"
}'
```
> this has to be sent authenticated


This endpoint updates an existing user in the data base. The username and emails are checked for uniqueness agian to avoid conflicts. 

## Delete an Exsiting User

> this has to be sent authenticated

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken'
```


This endpoint deletes an existing user in the data base. The user authenticated by the toekn will be deleted 



# Profile Picture

## Get Profile picture

> you can send this anonmously

```shell
curl --location 'https://data.thesisfinder.com/profilepicture/username'
```
> make sure to replace `username` with the username associated with the profile picture

> This request gets the anonymous user profile picture
```shell
curl --location 'https://data.thesisfinder.com/profilepicture/anonymous'
```

This endpoint returns the profile picture associated with an account. If no picture is set, it returns a default picture. The image will be a `image/png` with 256 x 256 resolution.

## Update a Profile Picture

Currently the API can only handle `image/png`.

> this has to be sent authenticated

```shell
curl --location 'https://data.thesisfinder.com/profilepicture' \
--header 'Content-Type: image/png' \
--header 'Token: tokentokentoken' \
--data 'image.png'
```


This endpoint overrides the current image with a new one. All images get resized to 256 x 256.


## Delete a Profile Picture

> this has to be sent authenticated

```shell
curl --location --request DELETE 'https://data.thesisfinder.com/profilepicture' \
--header 'Token: tokentokentoken'
```


This endpoint deletes an existing profile picture. Then the default picture will be sent instead.

# Idea

## Get Ideas

Ideas have a hash value as id. The title has to be unique and not longer than 200 characters. An Idea can have up to 5 tags. There is also the user name of author attached to it.

### Featured Ideas

> you can send this anonmously

```shell
curl --location --request GET 'https://api.thesisfinder.com/idea/featured' \
--header 'Token: tokentokentoken' \
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

This endpoint gives a list 5 questions, meant to be displayed at the featured idea page


### Idea Details

> This method requires the idea id to look up the details of the question

```shell
curl --location --request GET 'https://api.thesisfinder.com/idea/details/ideaid' \
--header 'Token: tokentokentoken' \
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

To get more details send a request to `https://api.thesisfinder.com/idea/details`

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

This endpoint registers a new idea, which will be associated with the user authenticated. The return will be the idea id.


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
