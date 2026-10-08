pipeline {
    agent any

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
                    sh 'chmod +x mvnw && ./mvnw -B test'
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
