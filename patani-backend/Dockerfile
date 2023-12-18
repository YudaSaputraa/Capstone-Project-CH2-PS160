FROM node:16.20.0
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD node app.js
