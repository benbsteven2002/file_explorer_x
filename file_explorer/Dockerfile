# Stage 1: Build the Angular project
FROM node:latest as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular project
RUN npm run build

# Stage 2: Deploy the built project on Nginx
FROM nginx:1.21.1

# Copy the built Angular project from the previous stage
COPY --from=build /app/dist /usr/share/nginx

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default Nginx port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
