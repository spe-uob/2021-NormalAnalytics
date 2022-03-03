FROM mariadb
COPY ./db-init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
ENV MARIADB_ROOT_PASSWORD=password
CMD ["mysqld"]