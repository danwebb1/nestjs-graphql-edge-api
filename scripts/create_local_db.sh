#!/usr/bin/env bash
set -x

DB_NAME='nestjs_graphql_edge_api'
DB_USER='postgres_dw'
DB_PASS='postgres'



if id "postgres" >/dev/null 2>&1; then
    sudo -u postgres createdb ${DB_NAME}
    psql -d ${DB_NAME} -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO postgres;"
else
    createdb ${DB_NAME}
    psql -d ${DB_NAME} -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO postgres;"
fi

export NODE_ENV=local
export NODE_CONFIG_DIR="$(pwd)/config/"