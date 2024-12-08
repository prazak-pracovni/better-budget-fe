import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import { ITransactionsFilter } from '@transactions/interfaces/transactions-filter.interface';
import { ICategory } from '@categories/interfaces/category.interface';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { IBalance } from '@/features/transactions/interfaces/balance.interface';

interface Props {
  transactions: ITransaction[];
  transactionFilter: ITransactionsFilter;
  balance: IBalance;
  categories: ICategory[];
}

const Graphs: React.FC<Props> = ({ transactions, transactionFilter, balance, categories }) => {
  return (
    <div className="flex gap-x-8">
      <LineGraph transactions={transactions} transactionFilter={transactionFilter} balance={balance} />
      <PieGraph transactions={transactions} categories={categories} />
    </div>
  );
};

export default Graphs;
