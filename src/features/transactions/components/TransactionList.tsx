import { useGetTransactions } from '@transactions/api/useGetTransactions';
import TransactionItem from './TransactionItem';
import { ICategory } from '@/features/categories/interfaces/category.interface';

interface Props {
  categories: ICategory[] | undefined;
}

const TransactionList: React.FC<Props> = ({ categories }) => {
  const { data: transactions } = useGetTransactions();

  return (
    <div className="flex flex-col gap-2">
      {transactions?.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} categories={categories}></TransactionItem>
      ))}
    </div>
  );
};

export default TransactionList;
