FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["node", "start"]