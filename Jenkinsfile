pipeline {
    agent any
    environment {
    JAVA_HOME = "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
    PATH = "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home/bin:/Users/jeminvasoya/.nvm/versions/node/v24.21.0/bin:/opt/homebrew/bin:${env.PATH}"
    }
    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                 dir('backend') {
                    sh 'java -version'
                    sh 'mvn --version'
                    sh 'mvn clean test'
        }
    }
}
    }

    post {
        always {
            junit testResults: 'backend/target/surefire-reports/*.xml', allowEmptyResults: true
        }
    }
}
