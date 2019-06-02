FROM node:12 as builder
#ENV NODE_ENV=production
WORKDIR /src/app
COPY ./src/package.json ./src/package-lock.json ./
# TODO remove the --force from the install...
RUN npm install --force && npm cache clean --force
COPY ./src/ .
RUN npm run-script build

FROM nginx:1-alpine
HEALTHCHECK --timeout=1s --retries=99 \
        CMD wget -q --spider http://127.0.0.1:80/ \
         || exit 1

RUN apk add --update --upgrade --no-cache wget \
# Install envsubst command for replacing config files in system startup
# - it needs libintl package
# - only weights 100KB combined with it's libraries
&& apk add gettext libintl

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/app/dist /usr/share/nginx/html
