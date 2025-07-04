# Step 1: Build the application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app (this is where the REACT_APP_ variables must be available)
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build the application for production
RUN npm run build

# Step 2: Serve the application
FROM nginx:latest

# Copy the built application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that NGINX is listening on
EXPOSE 80

# Start NGINX with the default configuration
CMD ["nginx", "-g", "daemon off;"]
