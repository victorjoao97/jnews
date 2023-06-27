FROM node:18-alpine3.17

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

CMD ["node", "/app/src/main/server.js"]