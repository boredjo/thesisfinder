# Stage 1: Build Stage
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine AS production

# Copy build files from the build stage to Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
