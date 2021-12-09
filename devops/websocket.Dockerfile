FROM node:16.9.1-alpine

WORKDIR /main
COPY ./server/websocket.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5500

CMD ["node", "websocket.js"]