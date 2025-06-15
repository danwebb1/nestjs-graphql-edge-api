# NestJS GraphQL Edge API

This project is a boilerplate for a GraphQL API built with [NestJS](https://nestjs.com/), using:
- PostgreSQL (via TypeORM)
- RabbitMQ (for event-driven architecture)
- Jest (unit testing)
- Docker (optional support for Postgres & RabbitMQ)
- TypeScript (strong typing across the stack)

## Features

- `Edge` entity with fields: `id`, `created_at`, `updated_at`, `capacity`, `node1_alias`, `node2_alias`
- GraphQL Queries: `getEdges`, `getEdge(id)`
- GraphQL Mutation: `createEdge`
- RabbitMQ events on edge creation
- Listener that logs new edges and updates aliases
- Jest tests for mutation and validation
- Docker Compose for Postgres and RabbitMQ (optional)

---

## Requirements

- Node.js (v18+ recommended)
- npm
- Docker (optional, for DB and message broker)

---

## Installation

```bash
# Clone the repo
git clone https://github.com/your-org/nestjs-edge-api.git
cd nestjs-edge-api

# Install dependencies
npm install

# Build app
npm run build

# use scripts directory to create a local db & user if needed
/scripts

# Run supplied migration
node dist/migrate.js

# Fire up the app
npm run start

