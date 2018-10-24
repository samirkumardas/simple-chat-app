FROM node:latest

LABEL author="Samir Das"

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV 

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]