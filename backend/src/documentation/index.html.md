---
title: ThesisFinder API Reference v0.6.5

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

Thesisfinder API! Work in progress. V0.6.5

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

# API-Wide Errors

There are middlewares in place, that can cause errors on all routes.

### Parsing Errors
Code | Message | Explaination
422 | parse fail | Parsing the JSON failed. The JSON object isn't vaild.
422 | not application/json  | This endpoint requires the content-type to be `application/json`.
422 | not image/png  | This endpoint requires the content-type to be `image/png`.
422 | password too long  | The password attribute can be maximum 64 characters long.
422 | 'tag' missing | The required key `tag` is missing from the JSON object.

### Authentication Errors
Code | Message | Explaination
403 | auth fail | The token is not valid.

### DB Errors
Code | Message | Explaination
500 | db fail | The MySQL cursor could not be generated. The Database is down.

<aside class="success">
The container logs give more insight on errors
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

```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://data.thesisfinder.com/login/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "user": "testuser",
    "password": "test123"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```
> Make sure to send `Content-Type: application/json`

> The above command returns JSON structured like this:

```json
{
    "token": "tokentokentoken"
}
```

This endpoint is used to retrive the authentication token. This request should be sent anoymouly, that is without authentification in the header.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
user | str | The user name of account
password | str | The password of the account
token | str | Use the token returned by this route to authenticate all other routes. This token is valid for 24h

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no user | The API could not find a user with that user name.
403 | auth fail | The password is wrong or there is an error with the database.


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
    "user": "anonymous",
    "first_name": "Anonymous",
    "last_name": "User",
    "country": "US",
    "email": "",
}
```
> This is the anonymous result

This endpoint gives the information about the user identified by the auth token. An endpoint to obtain other useres information (without being logged in as that user) is not planned.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
user | str | The user name of account
first_name | str | The first name of the user
last_name | str | The Last name of the user
country | str | The country code of the Account, typically 2 capital letters.
email | str | The email associated with the account


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

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
user | str | The user name of account
first_name | str | The first name of the user
last_name | str | The Last name of the user
country | str | The country code of the Account, typically 2 capital letters.
email | str | The email associated with the account
password | str| The password used for `/login`. Not longer than 64 characters.

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | not unique | The user name or email are already taken.
401 | no auth | The authorized user does not have the permisson for this action.

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

# Claim 

Claims are unique, every account can only claim an idea once.

## Claim an idea

To claim an idea, simply sent an authenticated `GET` request

> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/claim/' \
--header 'Token: tokentokentoken' \
--data-raw '{
		"idea": "some idea hash"
}'
```

## Get claims

### From user


> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/claim/user/' \
--header 'Token: tokentokentoken'
```

This endpoint will return all the ideas claimed by the authenticated user.

### From any user


> You need to be authentiacted to perform this action

```shell
curl --location --request GET 'https://api.thesisfinder.com/claim/user/username' 
```

This endpoint will return all the ideas claimed by the authenticated user.

### From question

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


## Delete a claim

To delete a claim, simply sent an authenticated `DELETE` request

> You need to be authentiacted to perform this action

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/claim/someidhash' \
--header 'Token: tokentokentoken' 
```

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

