FROM node:16-alpine as build

WORKDIR /clothesShop/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.4-alpine

WORKDIR /clothesShop/frontend

COPY --from=build /clothesShop/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80