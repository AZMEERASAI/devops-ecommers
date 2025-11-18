pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "azmeerasai/backend:latest"
        FRONTEND_IMAGE = "azmeerasai/frontend:latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-creds"   // FIXED credentials ID
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", 
                                                 usernameVariable: 'DOCKER_USER', 
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        echo Logging in to Docker Hub...
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat """
                        docker build -t ${BACKEND_IMAGE} .
                        docker push ${BACKEND_IMAGE}
                    """
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat """
                        docker build -t ${FRONTEND_IMAGE} .
                        docker push ${FRONTEND_IMAGE}
                    """
                }
            }
        }

        stage('Deploy MongoDB') {
            steps {
                bat "kubectl apply -f k8s\\mongo-deployment.yaml"
            }
        }

        stage('Deploy Backend') {
            steps {
                bat "kubectl apply -f k8s\\backend-deployment.yaml"
            }
        }

        stage('Deploy Frontend') {
            steps {
                bat "kubectl apply -f k8s\\frontend-deployment.yaml"
            }
        }

        stage('Verify Deployment') {
            steps {
                bat "kubectl get pods"
                bat "kubectl get svc"
            }
        }
    }
}

