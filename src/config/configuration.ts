import { AppConfiguration } from './interfaces/app-config.interface';

export default (): AppConfiguration => {
  const isLocal = process.env.NODE_ENV === 'local';

  const port = process.env.PORT ?? 3000;

  const rabbitmq = {
    url: process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672',
    queue: process.env.RABBITMQ_QUEUE ?? 'edge_events',
    // If you have issues connecting to rabbitMQ on Docker and get cookie errors just use this
    cookie: process.env.RABBITMQ_ERLANG_COOKIE ?? 'supersecretcookievalue123',
  };

  const playground: boolean = process.env.GRAPHQL_PLAYGROUND === true;
  const introspection: boolean = process.env.GRAPHQL_INTROSPECTION === true;

  const config: AppConfiguration = {
    // Type the config object with AppConfiguration
    basePath: process.env.BASE_PATH || '',
    port,
    rabbitmq,
    playground,
    introspection,
  };

  if (isLocal) {
    console.log(config);
  }

  return config;
};
