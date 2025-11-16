# ---------------------------------------------------------
# Base Image: Node.js 24.11.1 on Alpine 3.21
# ---------------------------------------------------------
FROM node:24.11.1-alpine3.21

# Create working directory in container
WORKDIR /usr/src/app

# Copy only package files first (best practice)
# This allows Docker to cache npm install and avoid reinstalling
# dependencies when only source code changes.
COPY package.json package-lock.json ./

# Install only production dependencies using npm ci
# npm ci ensures clean, reproducible installs based on package-lock.json
# --omit=dev will exclude devDependencies for a smaller production image.
RUN npm ci --omit=dev

# Copy full project AFTER dependencies for better caching
COPY . .

# Open the port your server listens to
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
