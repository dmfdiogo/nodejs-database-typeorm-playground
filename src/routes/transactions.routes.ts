import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import AppError from '../errors/AppError';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find({
    relations: ['category'],
  });
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  try {
    if (type !== 'income' && type !== 'outcome')
      throw new AppError("Can't recognize this transaction type");

    const transaction = await createTransactionService.execute({
      title,
      value,
      type,
      category,
    });

    return response.json(transaction);
  } catch (error) {
    return response
      .status(400)
      .json({ status: 'error', message: error.message });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id: transaction_id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  try {
    await deleteTransactionService.execute(transaction_id);
    return response.status(204).json({});
  } catch (err) {
    return response.status(404).json({ error: err.message });
  }
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();
    const importedTransactions = await importTransactionsService.execute(
      request.file.path,
    );
    return response.status(200).json(importedTransactions);
  },
);

export default transactionsRouter;
