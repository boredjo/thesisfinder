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