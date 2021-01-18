import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';

// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  // eslint-disable-next-line prettier/prettier
  public async execute({ title, value, type, category: category_title }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const balance = await transactionsRepository.getBalance();
    if (type === 'outcome' && (await balance.total) < value)
      throw new AppError("Can't execute this transaction: not enough balance");

    // Begin - busca o id da categoria, se existe entao cria uma
    let category = await categoriesRepository.findOne({
      title: category_title,
    });
    if (!category) {
      category = categoriesRepository.create({ title: category_title });
      await categoriesRepository.save(category);
    }
    // End
    // transactionDTO tava aqui
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: category.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
