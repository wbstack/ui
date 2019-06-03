#!/bin/sh

#export DOLLAR='$'
envsubst < /dockertemplates/default.conf > /etc/nginx/conf.d/default.conf

#exec nginx -g 'daemon off;'
echo "Running: ${@}"
exec "$@"
