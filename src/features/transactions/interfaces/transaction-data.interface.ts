import { ITransaction } from '@transactions/interfaces/transaction.interface';

export interface ITransactionsData {
  transactions: ITransaction[];
  page: number;
  total: number;
}
