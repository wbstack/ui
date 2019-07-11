FROM node:12 as builder

#ENV NODE_ENV=production

WORKDIR /src/app

COPY ./src/package.json ./src/package-lock.json ./

# TODO remove the --force from the install...
RUN npm install --force && npm cache clean --force

COPY ./src/ .

ARG API_URL
RUN test -n "$API_URL"

RUN npm run-script build


FROM nginx:1-alpine

RUN apk add --update --upgrade --no-cache wget

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
