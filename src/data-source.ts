import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts']
} as DataSourceOptions);

dataSource.initialize().catch((error) => {
  console.error('Error during Data Source initialization', error);
});

export default dataSource;
