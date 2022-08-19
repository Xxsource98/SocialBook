FROM node:16.16.0

WORKDIR /app/frontend

COPY package.json /app/frontend

RUN npm install

COPY . /app/frontend

ENV SERVER_DOMAIN=127.0.0.1
ENV SERVER_URL=http://127.0.0.1
ENV SERVER_PORT=8031

ENV SERVER_CONTAINER_DOMAIN=socialbook-server
ENV SERVER_CONTAINER_URL=http://socialbook-server
ENV SERVER_CONTAINER_PORT=8000

EXPOSE 8001

ENTRYPOINT [ "npm", "run" ]