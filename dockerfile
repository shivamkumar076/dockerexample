# 1. Use the official Node.js lightweight alpine image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /docker

# 3. Copy only the package.json files first to leverage Docker layer caching
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your application code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 3000

# 7. Define the command to run your app
CMD ["npm", "start"]