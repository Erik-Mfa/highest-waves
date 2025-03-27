# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Set environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Expose the port the app runs on (3000 for Express)
EXPOSE 3001

# Run the command to start your application
CMD ["npm", "start"]
