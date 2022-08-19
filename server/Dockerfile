FROM node:16.16.0

WORKDIR /app/server

RUN npm install -g nodemon typescript ts-node

COPY package.json /app/server

RUN npm install

COPY . /app/server

ENV PORT=8000

EXPOSE 8000

CMD [ "npm", "run", "start" ]