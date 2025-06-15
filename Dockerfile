# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

CMD sh -c "node dist/migrate.js && npm run start:prod"