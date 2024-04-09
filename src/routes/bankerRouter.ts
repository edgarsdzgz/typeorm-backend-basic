import express from 'express';
import { Banker } from '../entities/Banker';
import { Client } from '../entities/Client';

const bankerRouter = express.Router();

bankerRouter.post('/api/v1/bankers/create', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    employee_number,
  } = req.body;

  const newBanker = Banker.create({
    first_name,
    last_name,
    email,
    employee_number,
  })
  await newBanker.save();
  return res.json(newBanker);
});

bankerRouter.put('/api/v1/bankers/:banker_id/:client_id', async (req, res) => {
  const { banker_id, client_id } = req.params

  const client = await Client.findOneBy({
    id: parseInt(client_id, 10)
  })

  const banker = await Banker.findOneBy({
    id: parseInt(banker_id, 10)
  })

  if(!client || !banker) return res.json({ message : "Banker or Client not found."});

  banker.clients = [
    ...banker.clients,
    client,
  ]

  await banker.save();
  return res.json({
    message: `Client ${client.first_name} ${client.last_name} assigned to Banker #${banker.employee_number} `
  })
});

export default bankerRouter;