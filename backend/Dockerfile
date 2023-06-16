FROM node:16-alpine

WORKDIR /clothesShop/backend

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]

