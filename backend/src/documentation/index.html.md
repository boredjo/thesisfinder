---
title: ThesisFinder API Reference v0.2.0pip

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

Thesisfinder API! Work in progress.

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

# Content

```shell
curl --location --request GET 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken' \
```

Thesisfinder API always expect data in the `application/json` type. Unless it is a `GET` or `DELETE` request, the body cannot be empty. At a minimum, an empty JSON object has to be sent.

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