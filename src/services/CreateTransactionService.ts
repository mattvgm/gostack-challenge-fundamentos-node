import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const currentBalance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value >= currentBalance.total) {
      throw Error('You have an invalid balance');
    }

    const CreatedTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return CreatedTransaction;
  }
}

export default CreateTransactionService;
