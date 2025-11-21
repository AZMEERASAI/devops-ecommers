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

        /* --------------------- CHECKOUT ----------------------- */
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        /* --------------------- BACKEND TEST ----------------------- */
        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat """
                        echo Running backend tests...
                        node -v
                        npm -v

                        npm ci
                        npm test
                    """
                }
            }
        }

        /* --------------------- FRONTEND TEST ----------------------- */
        stage('Frontend Test') {
            steps {
                dir('frontend') {
                    bat """
                        echo Running frontend tests...
                        node -v
                        npm -v

                        npm ci
                        set CI=true && npm test
                    """
                }
            }
        }

        /* --------------------- INSTALL & BUILD BACKEND ----------------------- */
        stage('Build Backend App') {
            steps {
                dir('backend') {
                    bat """
                        echo Installing backend dependencies...
                        npm install

                        echo Building backend...
                        npm run build
                    """
                }
            }
        }

        /* --------------------- INSTALL & BUILD FRONTEND ----------------------- */
        stage('Build Frontend App') {
            steps {
                dir('frontend') {
                    bat """
                        echo Installing frontend dependencies...
                        npm install

                        echo Building frontend...
                        npm run build
                    """
                }
            }
        }

        /* --------------------- LOGIN DOCKER HUB ----------------------- */
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        echo Logging into Docker Hub...
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """
                }
            }
        }

        /* --------------------- BUILD BACKEND DOCKER IMAGE ----------------------- */
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat """
                        echo Building backend Docker image...
                        docker build --no-cache -t ${BACKEND_IMAGE} .
                        docker push ${BACKEND_IMAGE}
                    """
                }
            }
        }

        /* --------------------- BUILD FRONTEND DOCKER IMAGE ----------------------- */
        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat """
                        echo Building frontend Docker image...
                        docker build --no-cache -t ${FRONTEND_IMAGE} .
                        docker push ${FRONTEND_IMAGE}
                    """
                }
            }
        }

        /* --------------------- UPDATE YAML FILES ----------------------- */
        stage('Update Kubernetes Manifests') {
            steps {
                bat """
                    powershell -Command "(Get-Content k8s/backend-deployment.yaml) -replace 'image: azmeerasai/backend:.*', 'image: azmeerasai/backend:${IMAGE_VERSION}' | Set-Content k8s/backend-deployment.yaml"
                    powershell -Command "(Get-Content k8s/frontend-deployment.yaml) -replace 'image: azmeerasai/frontend:.*', 'image: azmeerasai/frontend:${IMAGE_VERSION}' | Set-Content k8s/frontend-deployment.yaml"
                """
            }
        }

        /* --------------------- APPLY TO KUBERNETES ----------------------- */
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KCFG')]) {
                    bat """
                        echo Deploying to Kubernetes...

                        kubectl --kubeconfig=%KCFG% apply -f k8s\\mongo-deployment.yaml

                        kubectl --kubeconfig=%KCFG% apply -f k8s\\backend-deployment.yaml
                        kubectl --kubeconfig=%KCFG% rollout restart deployment backend

                        kubectl --kubeconfig=%KCFG% apply -f k8s\\frontend-deployment.yaml
                        kubectl --kubeconfig=%KCFG% rollout restart deployment frontend
                    """
                }
            }
        }

        /* --------------------- VERIFY DEPLOYMENT ----------------------- */
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
