import express from 'express';
import { Transaction, TransactionTypes } from '../entities/Transaction';
import { Client } from '../entities/Client';

const transactionRouter = express.Router();

transactionRouter.post("/api/v1/transactions/create/:client_id", async (req, res) => {
  const { client_id } = req.params;
  const { amount, type } = req.body;

  const client = await Client.findOneBy({ id: parseInt(client_id, 10) });
  if(!client) return res.json({ message: "Client not found" });

  const newTransaction = Transaction.create({
    amount: parseInt(amount, 10), 
    type,
    client,
  })
  await newTransaction.save()

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = Number(client.balance) + Number(newTransaction.amount);
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = Number(client.balance) - Number(newTransaction.amount);
  }
  await client.save();
  return res.json({
    message: "Transaction Created."
  })
})

export default transactionRouter;
