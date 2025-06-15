declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    RABBITMQ_URL: string;
    RABBITMQ_QUEUE: string;
    RABBITMQ_ERLANG_COOKIE: string;
    GRAPHQL_PLAYGROUND: boolean;
    GRAPHQL_INTROSPECTION: boolean;
    BASE_PATH: string;
  }
}
