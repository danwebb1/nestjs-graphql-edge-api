#!/usr/bin/env bash
set -x

DB_NAME='nestjs_graphql_edge_api'
DB_USER='postgres_dw'
DB_PASS='postgres'

if id "postgres" >/dev/null 2>&1; then
    sudo -u postgres -H -- psql -d ${DB_NAME} -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
    sudo -u postgres -H -- psql -d ${DB_NAME} -c "ALTER USER $DB_USER CREATEDB;"
    sudo -u postgres -H -- psql -d ${DB_NAME} -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO $DB_USER;"
else
    psql -d ${DB_NAME} -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
    psql -d ${DB_NAME} -c "ALTER USER $DB_USER CREATEDB;"
    psql -d ${DB_NAME} -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO $DB_USER;"
fi
