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

# Build the application for production
RUN npm run build

# Step 2: Serve the application
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that NGINX is listening on
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
