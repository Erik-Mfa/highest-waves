# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Expose the port the app runs on (3000 for Express)
EXPOSE 3001

# Define environment variables if necessary (you can pass these during deployment too)
ENV NODE_ENV=production

# Run the command to start your application
CMD ["npm", "start"]
