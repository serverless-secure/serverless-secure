<h1 align="center">✨ Serverless-Secure [Beta] ✨ </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.5.Beta-blue.svg?cacheSeconds=2592000" />
  <a href="https://serverless-secure.github.io/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/serverless-secure/serverless-secure/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/serverless-secure/serverless-secure/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/serverless-secure/serverless-secure" />
  </a>
  <!-- <a href="https://twitter.com/serverless-secure" target="_blank">
    <img alt="Twitter: slssecure" src="https://img.shields.io/twitter/follow/slssecure.svg?style=social" />
  </a> -->
</p>

Lambda Secure Serverless Services - ***[ Beta ]***

### 🕸️ [Website](https://serverless-secure.com) 🏠 [Homepage](https://github.com/serverless-secure/serverless-secure#readme) ✨ [Demo](http://serverless-secure.com/demo)

## Install
### 
```sh
$ npm install serverless-secure -D
```
## Configure

```sh
plugins: [
    ....,
    'serverless-secure',
  ],
```

## Usage

```sh
$ serverless secure
or
$ sls secure -p <route-path>

***Adds Secure Layer:***

# 	secureAuthorizer: {
#   		handler: "secure_layer/handler.secureAuthorizer
#   	}

***..to desired route:***

# hello: {
#     handler: 'handler.hello',
#     events: [
#         {
#           http: {
#             method: 'get',
#             path: 'hello',
#             cors: '${self:custom.corsValue}',
#             authorizer: 'secureAuthorizer'
/##############################################/
```
***
## Secure a token

```sh
$ curl --location --request POST 'http://localhost:3000/dev/secure_token' \
--header 'x-api-key: <YOUR GENERATED API KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "you can also request a session token: below",
    "expires": "5" <---<< Request a Session Route!!
}'
```
## Employ token

```sh
$ curl --location --request GET 'http://localhost:3000/dev/hello' \
--header 'Authorization: eyJhbGciOiJIUzI1NiJ9.....Z3wXEsAIdXzCIY'
```
***
## Build a Session Route

```sh
$ sls secure-session -p mysession
```

## Employ session

```sh
$ curl --location --request POST 'http://localhost:3000/dev/b34ef189e......143de480387a/session' \
--header 'Authorization: true' \
--header 'Content-Type: text/plain' \
--data-raw '{
}'
```
## Build an Encryption Route (MITM)

```sh
$ sls secure-secret --passphrase mysecret
```

## Employ EnCryption / DeCryption

```sh
$ curl --location --request POST 'http://localhost:3000/dev/EnCryptMessage' \
--header 'Content-Type: application/json' \
--data-raw '{"message": "Man in the middle message"}'
```
```sh
$ curl --location --request POST 'http://localhost:3000/dev/DeCryptMessage' \
--header 'Content-Type: application/json' \
--data-raw '{"message":"gePrUcw2F....dYLhnknBG4ttegpP0fA=="}'
```
***
## Headers:
```diff
- N.B: All --header Authorization requests require a value!
```

![header Authorization = true](https://github.com/serverless-secure/serverless-secure/blob/master/dist/images/header-example.png?raw=true)

***
## Black-List IPAdresses

```sh
$ sls secure-blacklist -ip 127.0.0.1
```
***
## White-List IPAdresses

```sh
$ sls secure-whitelist -ip 127.0.0.1
```
***
## Run tests

```sh
$ npm run test
```
***
## Utilities:
* $ sls secure-key
* $ sls secure-policy

## Alpha Version 🛠 TODO 🛠️
* $ sls secure-email
* $ sls secure-message
* $ sls secure-headers
* $ sls secure-monitor
* $ sls secure-database
* ...and much much more...

## Author 👤 **Serverless-Secure**

* Website: https://serverless-secure.com/
* Twitter: [@serverless-secure](https://twitter.com/slssecure)
* Github: [@serverless-secure](https://github.com/serverless-secure)
* LinkedIn: [@serverless-secure](https://www.linkedin.com/company/serverless-secure)

## Contributing 🤝 

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/serverless-secure/serverless-secure/issues). You can also take a look at the [contributing guide](https://github.com/serverless-secure/serverless-secure/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## License 📝 

Copyright © 2020 [Serverless-Secure Software Publishing House](https://github.com/serverless-secure).<br />
This project is [MIT](https://github.com/serverless-secure/serverless-secure/blob/master/LICENSE) licensed.

***
