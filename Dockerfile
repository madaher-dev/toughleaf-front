# Use Node.js v20.16.0 as the base image
FROM node:20.16.0-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to Docker environment
COPY pokemon-app/package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the app to the Docker container
COPY pokemon-app/ ./

# Expose the port that SvelteKit runs on
EXPOSE 5173

# Command to run when the container starts
CMD ["npm", "run", "dev"]
