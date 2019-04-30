# messaging_web_app
A messaging web app using Websocket technology

## Prerequisites
- Raspberry pi with raspbian or any server running a debian-like OS
- The ports `80` and `8080` must be open on your network.

## Node modules
The node modules are already included in the project directory.
- mariadb
- uuid
- websocket

## Install steps
For theses steps, we will assume that the git directory has already been cloned into the server.
1. Install nodeJS `apt-get install nodejs`
2. Install MariaDB `apt-get install mariadb-server` then `mysql_secure_installation`
3. Execute the sql script found in `/server_resources/sql_scripts/db_creation.sql`
3. Add a mariadb user and give him editing permissions on the created database.
4. Add the db user auth infos in `/server_resources/classes/databaseManager.js` in the `dbPool` const. Put the password in `/server_resources/private/credentials.js`
5. Configure the websocket url in `/client_resources/scripts/wsManager.js` in the `WEBSOCKET_URL` constant.
6. To start the website you must start the two servers with `node /server_resources/http_server/listener.js` and `node /server_resources/websocket_server/listener.js`
