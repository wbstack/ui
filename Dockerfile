FROM node:22 as builder

WORKDIR /src/app
COPY ./package.json ./package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ .
RUN VUE_APP_BUILD_FOR_DOCKER_IMAGE=1 npm run build

FROM nginx:1-alpine

LABEL org.opencontainers.image.source="https://github.com/wbstack/ui"
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY src/config.template.js /config.template.js
COPY ./nginx/default.template.conf /default.template.conf

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
