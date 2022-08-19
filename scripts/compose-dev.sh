#!/bin/sh
# shellcheck disable=SC2039,SC2128

services=("$@")

if [ -z "$services" ]; then
  services=("directus" "mysql" "redis")
fi

echo "Starting services:" "${services[@]}"
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d "${services[@]}"
