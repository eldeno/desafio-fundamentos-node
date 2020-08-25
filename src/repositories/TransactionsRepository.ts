import Transaction from '../models/Transaction';
// import transactionRouter from '../routes/transaction.routes';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    // const incomeTransactions = this.transactions.reduce((acc, cur) => {
    //   const transactionType = 'income';
    //   if (cur.type === transactionType) {
    //     acc.push(cur);
    //   }
    //   return acc;
    // }, []);

    // const outcomeTransactions = this.transactions.reduce((acc, cur) => {
    //   const transactionType = 'outcome';
    //   if (cur.type === transactionType) {
    //     acc.push(cur);
    //   }
    //   return acc;
    // }, []);

    // const totalIncome = incomeTransactions.reduce((acc, cur) => {
    //   return acc + cur.value;
    // }, 0);

    // const totalOutcome = outcomeTransactions.reduce((acc, cur) => {
    //   return acc + cur.value;
    // }, 0);
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
