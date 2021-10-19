FROM node:15 as builder

WORKDIR /src/app
COPY ./package.json ./package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ .
RUN NODE_ENV=production npm run build


FROM nginx:1-alpine

LABEL org.opencontainers.image.source="https://github.com/wbstack/ui"
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
