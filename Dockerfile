# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose the port for the app
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
