#!/bin/sh
set -e

# Set a default value for BACKEND_PORT if it's not defined
export BACKEND_PORT=${BACKEND_PORT:-5000}

# Substitute environment variables in the nginx config template
envsubst '${BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;' 