FROM node:20 as builder

WORKDIR /src/app
COPY ./package.json ./package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ .
RUN VUE_APP_BUILD_FOR_DOCKER_IMAGE=1 npm run build

FROM nginx:1-alpine

LABEL org.opencontainers.image.source="https://github.com/wbstack/ui"
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY src/config.template.js /config.template.js

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
