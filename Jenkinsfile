pipeline {
  agent any
  environment {
    BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
    GIT_COMMITTER_EMAIL = sh( script: "git --no-pager show -s --format='%ae'", returnStdout: true ).trim()
  }
  stages {
    stage('Git') {
      steps {
        script {
          step([$class: 'WsCleanup'])
          echo 'Pulling..'
          try{
            git branch: env.GIT_BRANCH_NAME, changelog: false, credentialsId: 'serverless-secure', poll: false, url: env.GIT_URL
          } catch(e){
            sh "git branch ${env.GIT_BRANCH_NAME}"
            git branch: env.GIT_BRANCH_NAME, changelog: false, credentialsId: 'serverless-secure', poll: false, url: env.GIT_URL
          }
          echo 'Pulled...'
        }
      }
    }
    stage('Install') {
      steps {
        echo 'Installing..'
        sh 'npm install --verbose'
        echo 'Installed...'
      }
    }
    stage('Testing') {
      failFast true
       parallel {
        stage('Unit Test') {
          steps {
            echo 'Testing..'
            sh 'npm run test'
            echo 'Passed'
          }
        } 
        stage('Lint Test') {
          steps {
            echo 'Linting..'
            sh 'npm run lint'
            echo 'Passed'
          }
        }     
        stage('Run-Sonarqube') {
          steps {
            echo 'Run Sonarqube..'
            sh 'npm run test:sonarQube'
            echo 'Passed'
          }
        }
        stage('Run-Snyk') {
          when { branch 'testing' }
            steps {
              echo 'Testing-Snyk..'
              snykSecurity(snykTokenId: 'snykSecurity', snykInstallation: 'snykSecurity', organisation: 'serverless-secure', failOnIssues: false)
              echo 'Passed'
            }
          }
      }
    }
    stage('Deploy-DOCS') {
      when { branch 'master' }
      steps {
        echo 'Deploy-Docs..'
        sh 'npm run deploy:compodoc'
        echo 'Passed'
      }
    }
    stage('Deploy') {
      failFast true
      parallel {
        stage('Deploy Zip') {
            steps {
                echo 'Deploying...'
                sh 'npm run deploy:local'
            }
        }
        stage('Build ZipPull') {
          steps {
              echo 'Deploying...'
              // git credentialsId: 'serverless-secure', url: 'https://github.com/serverless-secure/serverless-secure-zip.git'
              // build job: "serverless-secure-zip", parameters: [string(name: 'GIT_BRANCH_NAME', value: env.BRANCH_NAME)], wait: false
          }
        }
      }
    }
  }
  post {
    always {
      echo 'Pipeline Complete!'
      mail(subject: "Pipeline - ${currentBuild.result} - ${env.BRANCH_NAME}", body: "${currentBuild.fullDisplayName} \n\n ${env.BUILD_TAG} \n\n ${env.BUILD_URL} \n\n ${env.GIT_COMMITTER_EMAIL} \n\n ${env.GIT_COMMIT}", from: 'admin@serverless-secure.com', to: "admin@serverless-secure.com")
    }
  }
}
