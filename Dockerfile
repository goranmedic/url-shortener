FROM node:14-slim

LABEL version="0.1.0"

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 5001

CMD ["npm", "start"]


