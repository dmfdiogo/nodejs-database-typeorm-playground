import { EntityRepository, Repository, In } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactions = await this.find({
      where: {
        type: In(['income', 'outcome']),
      },
    });

    const balance: Balance = transactions.reduce(
      (accumulator: Balance, currentTransaction: Transaction) => {
        switch (currentTransaction.type) {
          case 'income':
            accumulator.income += currentTransaction.value;
            break;
          case 'outcome':
            accumulator.outcome += currentTransaction.value;
            break;
          default:
            break;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      initialBalance,
    );
    return balance;
  }
}

export default TransactionsRepository;
