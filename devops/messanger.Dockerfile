FROM node:16.9.1-alpine

WORKDIR /main
COPY ./server/messanger.js /main
COPY ./.env /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5000

CMD ["node", "messanger.js"]