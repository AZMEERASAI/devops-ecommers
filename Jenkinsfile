pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "azmeerasai/backend:latest"
        FRONTEND_IMAGE = "azmeerasai/frontend:latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-creds"     // Docker Hub credentials ID
        KUBECONFIG_CRED = "kubeconfig"                 // Kubernetes kubeconfig credentials ID
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
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
                        docker build --no-cache -t ${BACKEND_IMAGE} .
                        docker push ${BACKEND_IMAGE}
                    """
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat """
                        docker build --no-cache -t ${FRONTEND_IMAGE} .
                        docker push ${FRONTEND_IMAGE}
                    """
                }
            }
        }

        stage('Deploy MongoDB') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KCFG')]) {
                    bat """
                        kubectl --kubeconfig=%KCFG% apply -f k8s\\mongo-deployment.yaml
                    """
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KCFG')]) {
                    bat """
                        kubectl --kubeconfig=%KCFG% apply -f k8s\\backend-deployment.yaml
                        kubectl --kubeconfig=%KCFG% rollout restart deployment/backend
                    """
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KCFG')]) {
                    bat """
                        kubectl --kubeconfig=%KCFG% apply -f k8s\\frontend-deployment.yaml
                        kubectl --kubeconfig=%KCFG% rollout restart deployment/frontend
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KCFG')]) {
                    bat """
                        kubectl --kubeconfig=%KCFG% get pods
                        kubectl --kubeconfig=%KCFG% get svc
                    """
                }
            }
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> e8be3ddfcdd9993b7c45e4c4fe9c0f77ccff7b74
