FROM node:12 as builder

WORKDIR /src/app

COPY ./package.json ./package-lock.json ./

RUN npm install && npm cache clean --force

COPY ./ .

RUN npm run build

FROM nginx:1-alpine

RUN apk add --update --upgrade --no-cache wget

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
