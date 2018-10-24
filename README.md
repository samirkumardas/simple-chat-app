## simple-chat-app
A simple chat using NodeJS and react-redux 

## Used Tools
React, Redux, Redux-Saga, Immutable.js, MongoDB, nodeJS, WebSocket

## Starting the Application with Docker Compose

1. Clone the repo: `git clone git@github.com:samirkumardas/simple-chat-app.git`

2. Change current to directory simple-chat-app: `cd simple-chat-app`

3. Run `docker-compose build`

4. Run `docker-compose up`

5. Now navgiate to the URL http://localhost:8080

# Starting the Application without docker

1. Clone the repo: `git clone git@github.com:samirkumardas/simple-chat-app.git`

2. Change current to directory simple-chat-app: `cd simple-chat-app`

3. Adjust MongoDB URL on server/config/constant.js

4. Change currenty directory to `server` and Start server using the command: `node app.js`

5. Now get back to `simple-chat-app` directory and run the command: `npm start` (it will run the application with webpack devserver)


## Features Implemented 

1. Login, Registration
2. Channel Creation
3. Channel Chat - only text message
4. Private Chat - only text message


## Future Plan

Want to add some other basic features including:

1. Adding new members to existing channnel
2. Supporting other message type e.g image, video
3. Showing message status e.g read, delivered
4. Showing Typing... status while other user typing something.
