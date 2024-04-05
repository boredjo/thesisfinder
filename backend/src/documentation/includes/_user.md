# User

## Get User Information

<aside class="notice">
This endpoint uses the auth middleware. Request can be send anonmously
</aside>

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

<aside class="notice">
This endpoint uses the auth middleware. Request have to send anonmously
This endpoint parses for `application/json`
</aside>

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

<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.
This endpoint parses for `application/json`.
</aside>

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


This endpoint updates an existing user in the data base. The username and emails are checked for uniqueness agian to avoid conflicts. 

## Delete an Exsiting User

<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.
</aside>

> this has to be sent authenticated

```shell
curl --location --request DELETE 'https://api.thesisfinder.com/user/' \
--header 'Content-Type: application/json' \
--header 'Token: tokentokentoken'
```


This endpoint deletes an existing user in the data base. The user authenticated by the toekn will be deleted 

### Errors
Code | Message | Explaination
--------- | ------- | -----------
401 | no auth | The authorized user does not have the permisson for this action.
