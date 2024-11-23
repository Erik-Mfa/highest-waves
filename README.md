# SSH AWS INSTANCE------
## ssh -i ~/.ssh/key.pem ec2-user

# DOCKER------
## docker compose up --build -d
## docker compose --env-file .env.production up --build -d
## docker ps (check)              

# ESLINT/PRETTIER
## npm run lint
## npm run format

# AWS INSTANCE USER DATA SCRIPT
## !/bin/bash

# Update the package repository
## apt-get update -y

# Install Docker
## apt-get install -y docker.io

# Start Docker service
## systemctl start docker
## systemctl enable docker

# Install Docker Compose using apt
## apt-get install -y docker-compose

# Install Git 
## apt-get install -y git

# DOCKER COMPOSE------
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


# .env
NODE_ENV=development (standard mode)
MONGO_URI=mongodb+srv://Erik-Mfa:password@db.f86cf9k.mongodb.net/db
JWT_SECRET=rizzo
STRIPE_KEY=sk_test
STRIPE_WEBHOOK_SECRET=whsec
EMAIL_USER=erik@gmail.com   
EMAIL_PASS=ckeovllgecbmtesu
FRONTEND_URL=http://localhost:3000

# NEED TO GENERATE A NEW ONE FOR THE NEW DOMAIN
### reCAPTCHA site (frontend)
## 6LdhImoqAAAAAEzZyQrQ
### reCAPTCHA secret (backend)
## 6LdhImoqAAAAAPBnGnwz
