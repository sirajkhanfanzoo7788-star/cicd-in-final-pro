pipeline {
    agent any

    environment {
        // Your Docker image name
        DOCKER_IMAGE = "sirajahmad77/simple-cicd-app:latest"
        // Your GitHub repository
        GITHUB_REPO = "https://github.com/sirajkhanfanzoo7788-star/cicd-in-final-pro"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub..."
                git branch: 'main', url: "${GITHUB_REPO}.git"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    // Build the Docker image locally
                    def image = docker.build("${DOCKER_IMAGE}")
                    echo "Docker image ${DOCKER_IMAGE} built successfully!"
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    // Push image using Docker Hub credentials
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                    echo "Docker image ${DOCKER_IMAGE} pushed successfully!"
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    echo "Deploying to Minikube..."
                    // Use Jenkins Minikube kubeconfig credential
                    withCredentials([file(credentialsId: 'kubeconfig-credentials', variable: 'KUBECONFIG_FILE')]) {
                        // Apply deployment and service YAML
                        sh 'kubectl apply -f kubernetes/deployment.yaml --kubeconfig=$KUBECONFIG_FILE'
                        sh 'kubectl apply -f kubernetes/service.yaml --kubeconfig=$KUBECONFIG_FILE'

                        // Optional: check pods after deployment
                        sh 'kubectl get pods -A --kubeconfig=$KUBECONFIG_FILE'
                        sh 'kubectl get svc --kubeconfig=$KUBECONFIG_FILE'
                    }
                }
            }
        }

    }
}
