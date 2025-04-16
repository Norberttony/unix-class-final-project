# Using latest alpine image
FROM alpine:latest

# Update package manager, and add npm
RUN apk update && apk add nodejs npm

# Set the working directory
WORKDIR /app

# Copy over node module info
COPY package*.json ./

# Install node modules
RUN npm install

# Copy to container
COPY . .

# Expose ports
EXPOSE 3000

# Start server
CMD ["node", "index.mjs"]
