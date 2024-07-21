# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the app runs on using ENV
EXPOSE 5000
