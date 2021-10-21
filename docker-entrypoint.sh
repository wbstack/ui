#!/bin/sh

set -eu

export DOLLAR='$'
envsubst < /config.template.js > /usr/share/nginx/html/config.js

exec "$@"
