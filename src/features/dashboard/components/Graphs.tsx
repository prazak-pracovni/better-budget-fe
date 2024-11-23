import { useGetTransactionsData } from '@/features/transactions/api/useGetTransactionsData';
import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import { useGetCategories } from '@/features/categories/api/useGetCategories';
import NoData from '@/components/ui/NoData';

const Graphs = () => {
  const { data: transactionsData } = useGetTransactionsData('ASC');
  const { data: categories } = useGetCategories();

  const transactions = transactionsData?.transactions;

  return (
    <div className="flex gap-x-8">
      {transactions?.length ? (
        <>
          <LineGraph transactions={transactions} />
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
