FROM mysql:8.0.30

ENV MYSQL_PASSWORD=root
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_TCP_PORT=3306

EXPOSE 3306

COPY ./database.sql /docker-entrypoint-initdb.d/