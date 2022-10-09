FROM node:17-alpine

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

RUN npm i -g nodemon

CMD ["nodemon", "server.js"]