const scanner = require('sonarqube-scanner');
 
scanner(
  {
    serverUrl : 'http://sonarqube.serverless-secure.com/',
    token : "3b9a8fd25d7e6b5b3f00a80e6df77b56c9cbeb53",
    options: {
      'sonar.projectKey':'serverless-secure',
      'sonar.projectName': 'serverless-secure',
      'sonar.projectDescription': 'serverless-secure',
      'sonar.sources': './src'
    }
  },
  () => process.exit()
)
