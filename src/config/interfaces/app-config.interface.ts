export interface RabbitMqConfig {
  url: string;
  queue: string;
}

export interface AppConfiguration {
  port: number;
  basePath: string;
  rabbitmq: RabbitMqConfig;
  playground: boolean;
  introspection: boolean;
}