import { DataSource } from 'typeorm'
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';
import { Transaction } from '../entities/Transaction';
import dotenv from 'dotenv';
dotenv.config();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Client,
    Banker,
    Transaction,
  ],
  synchronize: true,
})

