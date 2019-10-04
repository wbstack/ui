FROM node:12 as builder

# Set various things
ARG API_URL
ENV API_URL $API_URL
#ENV NODE_ENV production

# Output the set values in the build log
RUN echo API_URL $API_URL, NODE_ENV $NODE_ENV

WORKDIR /src/app

COPY ./src/package.json ./src/package-lock.json ./

# TODO remove the --force from the install...
RUN npm install --force && npm cache clean --force

COPY ./src/ .

RUN npm run-script build


FROM nginx:1-alpine

RUN apk add --update --upgrade --no-cache wget

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /src/app/dist /usr/share/nginx/html
