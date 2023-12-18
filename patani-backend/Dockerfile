FROM node:12-slim
WORKDIR /app
COPY package*.json .
COPY . .
EXPOSE 5000
CMD node app.js
FROM node:16.20.0
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD node app.js
