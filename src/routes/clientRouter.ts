import express from 'express';
import { Client } from '../entities/Client';
import { PostgresDataSource } from '../utils/PostgresDataSource';

const clientRouter = express.Router();

clientRouter.get(`/api/v1/clients`, async (req, res) => {
  const allClients = await Client.find();
  return res.json(allClients)
});

// get one WITH transactions JOINED
clientRouter.get(`/api/v1/clients/:client_id`, async (req, res) => {
  const { client_id } = req.params;
  const oneClient = await PostgresDataSource
    .createQueryBuilder()
    .select('client')
    .from(Client, 'client')
    .leftJoinAndSelect('client.transactions', 'transaction')
    .where('client.id = :id', { id: client_id })
    .getOne()

  return res.json(oneClient)
});

clientRouter.post('/api/v1/clients/create', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    card_number,
    balance,
  } = req.body;

  const newClient = Client.create({
    first_name,
    last_name,
    email,
    card_number,
    balance,
  });
  await newClient.save();
  return res.json(newClient);
});

clientRouter.delete('/api/v1/clients/destroy/:client_id', async (req, res) => {
  const { client_id } = req.params;

  const response = await Client.delete(parseInt(client_id, 10))
  return res.json(response);
});

export default clientRouter;