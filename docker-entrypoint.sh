#!/bin/sh

set -eu

export DOLLAR='$'
envsubst < /config.template.js > /usr/share/nginx/html/config.js
envsubst '$API_URL' < /default.template.conf > /etc/nginx/conf.d/default.conf

exec "$@"
