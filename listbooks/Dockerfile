FROM node:17-alpine

WORKDIR /app

COPY . .

EXPOSE 9090

RUN npm install

RUN npm i -g nodemon

CMD ["nodemon", "server.js"]