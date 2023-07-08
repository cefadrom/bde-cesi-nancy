#!/usr/bin/env bash

# Check if the mysql container is running
container=$(docker ps -q -f name=bde-mysql)

if [ -z "$container" ]; then
  echo "Please start the bde-mysql container before running this script."
  exit 1
fi

# Ask the password of the database if it's not in the .env file
if [ -z $(grep '^MYSQL_ROOT_PASSWORD=' .env) ]; then
  echo "Enter the password of the database "
  read -s password
else
  echo "Using password from .env file"
  export $(grep '^MYSQL_ROOT_PASSWORD=' .env | xargs)
  password=$MYSQL_ROOT_PASSWORD
fi

# Save the database
echo "Saving the database to ./directus.sql..."
docker exec bde-mysql mysqldump -u root --password=$password directus > directus.sql
echo "Done."
