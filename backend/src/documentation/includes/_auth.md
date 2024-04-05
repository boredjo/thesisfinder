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