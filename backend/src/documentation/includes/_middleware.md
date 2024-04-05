# API-Wide Errors

There are middlewares in place, that can cause errors on all routes.

### Parsing Errors
Code | Message | Explaination
--------- | ------- | -----------
422 | parse fail | Parsing the JSON failed. The JSON object isn't vaild.
422 | not application/json  | This endpoint requires the content-type to be `application/json`.
422 | not image/png  | This endpoint requires the content-type to be `image/png`.
422 | password too long  | The password attribute can be maximum 64 characters long.
422 | 'tag' missing | The required key `tag` is missing from the JSON object.

### Authentication Errors
Code | Message | Explaination
--------- | ------- | -----------
403 | auth fail | The token is not valid.

### DB Errors
Code | Message | Explaination
--------- | ------- | -----------
500 | db fail | The MySQL cursor could not be generated. The Database is down.

<aside class="success">
The container logs give more insight on errors
</aside>