FROM node:latest

LABEL author="Samir Das"

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV 

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "build"]

ENTRYPOINT ["node", "http-server.js"]