<h1 align="center">✨ Serverless-Secure [Beta] ✨ </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1.Beta-blue.svg?cacheSeconds=2592000" />
  <a href="https://serverless-secure.github.io/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/serverless-secure/serverless-secure/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/serverless-secure/serverless-secure/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/serverless-secure/serverless-secure" />
  </a>
  <a href="https://twitter.com/serverless-secure" target="_blank">
    <img alt="Twitter: slssecure" src="https://img.shields.io/twitter/follow/slssecure.svg?style=social" />
  </a>
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
$ serverles secure
or
$ sls secure -p <route-path>


***Adds Secure Layer:***

# 	secureAuthorizer: {
#   		handler: "secure_layer/handler.secureAuthorizer
#   	}

***..to desired route:***

#   	hello: {
#   		handler: 'handler.hello',
#   		events: [
#    			{
#    				http: {
#    					method: 'get',
#    					path: 'hello',
#						  cors: '${self:custom.corsValue}',
#						  authorizer: 'secureAuthorizer'
#    				}
#    			}
#    		]
#    	}
```

## Run tests

```sh
$ npm run test
```
***
## Alpha Version 🛠 TODO 🛠️
* $ sls secure-encrypt
* $ sls secure-encrypt-monitor
* ...and much more...

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
