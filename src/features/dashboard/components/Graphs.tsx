import { useGetTransactions } from '@/features/transactions/api/useGetTransactions';
import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import { useGetCategories } from '@/features/categories/api/useGetCategories';

const Graphs = () => {
  const { data: transactions } = useGetTransactions('asc');
  const { data: categories } = useGetCategories();

  return (
    <div className="flex gap-x-8">
      <LineGraph transactions={transactions} />
      <PieGraph transactions={transactions} categories={categories} />
    </div>
  );
};

export default Graphs;
