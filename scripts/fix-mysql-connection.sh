#!/bin/bash

echo ""
echo "Directus is using an outdated library to connect to MySQL."
echo "To fix this problem, this script will change the login method to 'mysql_native_password', which is less secure."
echo "If you want to know more about that, see https://stackoverflow.com/a/56509065/12937885"
echo ""

read -p "Do you want to proceed? (y/n) " yn
echo ""

case $yn in
[yY]) echo "Patching database..." ;;
[nN])
  echo "Exiting."
  exit
  ;;
*)
  echo "Invalid response"
  exit 1
  ;;
esac

container=$(docker ps -q -f name=bde-mysql)

if [ -z "$container" ]; then
  echo "Please start the mysql container before running this script."
  exit 1
fi

read -p -s "Enter the password for the user 'directus': " dPassword
echo "Next, enter the password for the root user"

docker exec -it "$container" mysql -u root -p -e "ALTER USER 'directus'@'%' IDENTIFIED WITH mysql_native_password BY '$dPassword'; FLUSH PRIVILEGES;"

echo "Done."
