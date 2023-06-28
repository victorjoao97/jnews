FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["node", "/app/src/main/server.js"]