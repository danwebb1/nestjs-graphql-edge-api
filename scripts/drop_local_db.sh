#!/usr/bin/env bash

DB_NAME='nestjs_graphql_edge_api'

if id "postgres" >/dev/null 2>&1; then
    sudo -u postgres dropdb ${DB_NAME}
else
    dropdb ${DB_NAME}
fi
