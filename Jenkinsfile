pipeline {
    agent any

    environment {
        // Use your Docker Hub repository
        DOCKER_IMAGE = "sirajahmad77/cicd-final-pro-in"
        DOCKER_TAG   = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Pulling code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/sirajkhanfanzoo7788-star/cicd-in-final-pro.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    // Safer login using password-stdin
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push %DOCKER_IMAGE%:%DOCKER_TAG%'
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes (Minikube)...'
                bat 'kubectl config use-context minikube'
                bat 'kubectl apply -f k8s/'
            }
        }
    }
}
