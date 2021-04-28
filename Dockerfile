FROM node:16 as builder

WORKDIR /src/app
COPY ./package.json ./package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ .
RUN npm run build


FROM nginx:1-alpine

LABEL org.opencontainers.image.source="https://github.com/wbstack/ui"
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
