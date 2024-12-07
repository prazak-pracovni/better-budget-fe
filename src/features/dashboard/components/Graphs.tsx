import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import NoData from '@/components/ui/NoData';
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
      {transactions?.length ? (
        <>
          <LineGraph transactions={transactions} transactionFilter={transactionFilter} balance={balance} />
          <PieGraph transactions={transactions} categories={categories} />
        </>
      ) : (
        <NoData>
          <p className="text-center text-gray-700">
            There are no transactions yet. You can create new transactions on transaction page.
          </p>
        </NoData>
      )}
    </div>
  );
};

export default Graphs;
