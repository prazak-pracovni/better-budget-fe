import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import { ITransactionsFilter } from '@transactions/interfaces/transactions-filter.interface';
import { ICategory } from '@categories/interfaces/category.interface';
import { ITransaction } from '@transactions/interfaces/transaction.interface';

interface Props {
  transactions: ITransaction[];
  transactionFilter: ITransactionsFilter;
  balance: number;
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
