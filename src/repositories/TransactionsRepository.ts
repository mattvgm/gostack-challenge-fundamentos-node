import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const IncomeValue = this.transactions
      .filter(eachTrans => eachTrans.type === 'income')
      .map(eachIncome => eachIncome.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const OutcomeValue = this.transactions
      .filter(eachTrans => eachTrans.type === 'outcome')
      .map(eachOutcome => eachOutcome.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const total = IncomeValue - OutcomeValue;
    return { income: IncomeValue, outcome: OutcomeValue, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const NewTransaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(NewTransaction);
    return NewTransaction;
  }
}

export default TransactionsRepository;
