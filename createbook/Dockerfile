FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g nodemon

EXPOSE 8080

CMD ["nodemon", "server.js"]