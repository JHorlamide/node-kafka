FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g nodemon

EXPOSE 9090

CMD ["nodemon", "server.js"]