FROM node:16.9.1-alpine

WORKDIR /main
COPY ./server/listingService.js /main
COPY ./.env /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5002

CMD ["node", "listingService.js"]