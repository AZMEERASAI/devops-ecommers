pipeline {
    agent any

    environment {
        IMAGE_VERSION = "${BUILD_NUMBER}"
        BACKEND_IMAGE = "azmeerasai/backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "azmeerasai/frontend:${BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = "docker-hub-creds"
        KUBECONFIG_CRED = "kubeconfig"
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
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat """
                        docker build --no-cache -t ${BACKEND_IMAGE} .
                        docker push ${BACKEND_IMAGE}
                    """
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    bat """
                        docker build --no-cache -t ${FRONTEND_IMAGE} .
                        docker push ${FRONTEND_IMAGE}
                    """
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                bat """
                    powershell -Command "(Get-Content k8s/backend-deployment.yaml) -replace 'image: azmeerasai/backend:.*', 'image: azmeerasai/backend:${IMAGE_VERSION}' | Set-Content k8s/backend-deployment.yaml"
                    powershell -Command "(Get-Content k8s/frontend-deployment.yaml) -replace 'image: azmeerasai/frontend:.*', 'image: azmeerasai/frontend:${IMAGE_VERSION}' | Set-Content k8s/frontend-deployment.yaml"
                """
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
}
