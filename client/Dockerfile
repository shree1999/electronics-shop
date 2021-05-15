FROM node:alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html