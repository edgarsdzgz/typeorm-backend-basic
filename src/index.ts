import express from 'express';
import { PostgresDataSource } from './utils/PostgresDataSource'
import dotenv from 'dotenv';
import clientRouter from './routes/clientRouter';
import bankerRouter from './routes/bankerRouter';
import transactionRouter from './routes/transactionRouter';
dotenv.config();

const main = async () => {
  PostgresDataSource.initialize()
    .then(() => {
      console.log(`Postgres Data Source has been initialized on PORT ${process.env.DB_PORT}`);
    })
    .catch((err) => {
      console.error('Error during Postgres Data Source initialization ====>', err);
      throw new Error("Error during Postgres Data Source initialization")
    });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(clientRouter);
  app.use(bankerRouter);
  app.use(transactionRouter);

  const port = process.env.PORT || 8080
  app.listen(port, () => console.log(`The server is listening on port ${port}`));
}

main()
