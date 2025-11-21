FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY src ./src

COPY .env .env

ENV NODE_ENV=production

EXPOSE 5003

CMD ["node", "src/server/server.js"]
