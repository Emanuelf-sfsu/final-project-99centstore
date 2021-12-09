FROM node:16.9.1-alpine

WORKDIR /main
COPY ./kafka/jobWorker.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5003

CMD ["node", "imageService.js"]