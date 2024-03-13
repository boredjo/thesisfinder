---
title: ThesisFinder API Reference 

language_tabs: # must be one of https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
  - shell

toc_footers:
  - <a href='https://github.com/slatedocs/slate'>Documentation Powered by Slate</a>

includes:
  - errors

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

> You always need a JSON object in the body

```shell
# The Data cannot be empty
curl --location --request GET 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken' \
--data-raw '{}'
```
> Make sure to send `Content-Type: application/json`

Thesisfinder API always expect data in the `application/json` type. If no data should be send, send an empty json object.

# Login

## Get Token

```shell
curl --location --request GET 'https://api.thesisfinder.com/login/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"user": "username",
	"password": "password"
}'
```

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
--data-raw '{}'
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
--header 'Token: tokentokentoken' \
--data-raw '{}'
```


This endpoint deletes an existing user in the data base. The user authenticated by the toekn will be deleted 


