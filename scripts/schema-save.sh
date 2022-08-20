#!/bin/bash

docker exec -it bde-directus npx directus schema snapshot ./schema/schema.yaml "$@"
