FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm i -g nodemon

CMD ["nodemon", "server.js"]