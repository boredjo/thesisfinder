# Profile Picture

## Get Profile picture

<aside class="notice">
This endpoint uses the auth middleware if there is no username in the url. Request can be send anonymously.
</aside>

> you can send this anonmously

```shell
curl --location 'https://data.thesisfinder.com/profilepicture/username'
```
> make sure to replace `username` with the username associated with the profile picture

> This request gets the anonymous user profile picture
```shell
curl --location 'https://data.thesisfinder.com/profilepicture/anonymous'
```

This endpoint returns the profile picture associated with an account. If no picture is set, it returns a default picture. The image will be a `image/png` with 86 x 86 resolution.

### Parameters
Parameter | Datatype | Description
--------- | ------- | -----------
username | str | The user name of the account. If this is omitted, the auth token is used to get the user name

### Errors
Code | Message | Explaination
--------- | ------- | -----------
401 | no auth | The authorized user does not have the permisson for this action.


## Update a Profile Picture

<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.

This endpoint parses for `image/png`.
</aside>


```shell
curl --location 'https://data.thesisfinder.com/profilepicture' \
--header 'Content-Type: image/png' \
--header 'Token: tokentokentoken' \
--data 'image.png'
```


This endpoint overrides the current image with a new one. All images get resized to 86 x 86.


### Errors
Code | Message | Explaination
--------- | ------- | -----------
401 | no auth | The authorized user does not have the permisson for this action.


## Delete a Profile Picture
<aside class="notice">
This endpoint uses the auth middleware. Request can not be send anonymously.
</aside>


> this has to be sent authenticated

```shell
curl --location --request DELETE 'https://data.thesisfinder.com/profilepicture' \
--header 'Token: tokentokentoken'
```


This endpoint deletes an existing profile picture. Then the default picture will be sent instead.

### Errors
Code | Message | Explaination
--------- | ------- | -----------
401 | no auth | The authorized user does not have the permisson for this action.
422 | no image | There is no image associated with this user.