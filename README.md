# Project Setup and Configuration

## 📥 **Clone the Repository**

Before starting, clone the repository to your local machine:
```bash
git clone https://github.com/Erik-Mfa/highest-waves.git
🔐 Accessing the AWS EC2 Instance
To access your AWS EC2 instance, use the following command:

bash
Copy code
ssh -i ~/.ssh/key.pem ec2-user@<EC2_INSTANCE_PUBLIC_IP>
Replace <EC2_INSTANCE_PUBLIC_IP> with the actual public IP address of your EC2 instance.

🐳 Docker Setup
1. Running Docker Compose Locally
Make sure you have Docker and Docker Compose installed. Once you have cloned the repository, navigate to the project folder and run the following commands to start the services:

bash
Copy code
# Build and run the containers in detached mode
docker compose up --build -d

# Alternatively, use the .env.production file for production environment
docker compose --env-file .env.production up --build -d

# Check if the containers are running
docker ps
2. Stopping Docker Containers
To stop the containers:

bash
Copy code
docker compose down
📝 ESLint and Prettier
To ensure code quality and consistency, you can run ESLint and Prettier.

Linting Code
Run this to check for linting errors:

bash
Copy code
npm run lint
Formatting Code
To format the code automatically:

bash
Copy code
npm run format
🔧 AWS Instance User Data Script
Use the following user data script to configure your AWS EC2 instance with the necessary dependencies like Docker and Git:

bash
Copy code
#!/bin/bash

# Update the package repository
apt-get update -y

# Install Docker
apt-get install -y docker.io

# Start Docker service
systemctl start docker
systemctl enable docker

# Install Docker Compose
apt-get install -y docker-compose

# Install Git
apt-get install -y git
This script will run automatically when your EC2 instance starts, configuring everything you need.

🛠️ Docker Compose Configuration
The docker-compose.yml file defines the services for your application. Below is the configuration for both frontend and backend services:

yaml
Copy code
services:
  backend:
    build:
      context: ./backend
    container_name: backend
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: ${NODE_ENV} 
      MONGO_URI: ${MONGO_URI}
      JWT_SECRET: ${JWT_SECRET}
      STRIPE_KEY: ${STRIPE_KEY}
      STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET}
      EMAIL_USER: ${EMAIL_USER}
      EMAIL_PASS: ${EMAIL_PASS}
      FRONTEND_URL: ${FRONTEND_URL}

  frontend:
    build:
      context: ./frontend
      args:
        REACT_APP_API_URL: http://localhost:3001
    container_name: frontend
    ports:
      - "3000:80"
    environment:
      REACT_APP_API_URL: http://localhost:3001
      NODE_ENV: ${NODE_ENV}
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
backend: The backend service is built from the ./backend directory, exposes port 3001, and includes environment variables for MongoDB, JWT, Stripe, etc.
frontend: The frontend service is built from the ./frontend directory, exposes port 3000, and connects to the backend API.
🌍 Environment Variables (.env)
The .env file contains important environment variables for both development and production environments. Below is the template for the .env file:

dotenv
Copy code
NODE_ENV=development  # Set to 'production' for production environment
MONGO_URI=mongodb+srv://Erik-Mfa:password@db.f86cf9k.mongodb.net/db
JWT_SECRET=rizzo
STRIPE_KEY=sk_test
STRIPE_WEBHOOK_SECRET=whsec
EMAIL_USER=erik@gmail.com
EMAIL_PASS=ckeovllgecbmtesu
FRONTEND_URL=http://localhost:3000
Make sure to replace password with your actual MongoDB password and use the correct credentials for Stripe and Email.

✅ reCAPTCHA Keys
If you're using reCAPTCHA for your application, update the following keys:

Frontend reCAPTCHA Site Key: 6LdhImoqAAAAAEzZyQrQ
Backend reCAPTCHA Secret Key: 6LdhImoqAAAAAPBnGnwz
Make sure to generate new keys for any production domain changes.

🚀 Running the Application
Once the environment is set up, you can run the full application with Docker Compose:

Start the backend and frontend services:

bash
Copy code
docker compose up --build -d
Access the frontend at:

http://localhost:3000
The backend API will be running on:

http://localhost:3001
💻 Local Development
To run the application in a local development environment without Docker, ensure that you have Node.js, MongoDB, and the necessary dependencies installed. Then:

Install the dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
cd frontend
npm start
Start the backend:

bash
Copy code
cd backend
npm start
Visit the frontend at http://localhost:3000 and the backend at http://localhost:3001.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🔧 Troubleshooting
If you encounter any issues during the setup or running the application, please make sure:

Docker is installed and running.
The .env file is correctly configured.
All dependencies are installed by running npm install for both frontend and backend.
Check that the backend is running on port 3001 and the frontend on port 3000.
For any further help, feel free to open an issue in the repository or reach out to the project maintainers.

🚀 Enjoy using Highest Waves!
markdown
Copy code

### Explanation of the Sections:
- **Clone the Repository**: Instructions to clone your GitHub repository.
- **Accessing AWS EC2 Instance**: SSH command to access your EC2 instance.
- **Docker Setup**: Instructions for building and running Docker containers.
- **ESLint / Prettier**: Commands to lint and format the code.
- **AWS Instance User Data Script**: Script for configuring the AWS instance with Docker, Docker Compose, and Git.
- **Docker Compose Configuration**: The configuration for the services (frontend, backend) using Docker Compose.
- **Environment Variables (.env)**: Required environment variables for the application.
- **reCAPTCHA Keys**: Information about the reCAPTCHA keys.
- **Running the Application**: How to start the application with Docker or locally.
- **Troubleshooting**: Solutions for common issues.

---

You can copy this file directly into your `README.md` file. It uses appropriate Markdown synta
