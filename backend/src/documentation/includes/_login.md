# Login

## Get Token

<aside class="notice">
This endpoint parses for `application/json`
</aside>


```shell
curl --location 'https://api.thesisfinder.com/login/' \
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

This endpoint is used to obtain authentication tokens. This request should be sent anoymouly, that is without authentification in the header. Then the token can be used for all further requests.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
user | str | The user name of account.
password | str | The password of the account.
token | str | Use the token returned by this route to authenticate all other routes. This token is valid for 24h

### Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | no user | The API could not find a user with that user name.
403 | auth fail | The password is wrong or there is an error with the database.
