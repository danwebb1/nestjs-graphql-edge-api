import { DataSource, DataSourceOptions } from 'typeorm';
import { Edge } from './edge/edge.entity';
import { CreateAndSeedEdges1710000000000 } from './migrations/1710000000000-SeedEdges';
import * as dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'nestjs_graphql_edge_api',
  entities: [Edge],
  migrations: [CreateAndSeedEdges1710000000000],
  synchronize: false,
  logging: true,
};
export const connectionSource = new DataSource(dataSourceOptions);
