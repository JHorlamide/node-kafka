FROM node:17-alpine

WORKDIR /app

COPY package.json package*.json ./

RUN npm install

EXPOSE 9090

CMD ["node", "start"]