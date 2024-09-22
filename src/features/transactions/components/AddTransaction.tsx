import { useGetCategories } from '@/features/categories/api/useGetCategories';
import AddCategoryModal from '../../categories/components/AddCategoryModal';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';

const AddTransaction = () => {
  const { data: categories } = useGetCategories();

  return (
    <>
      <AddCategoryModal />
      <AddTransactionForm categories={categories} />
      <TransactionList categories={categories} />
    </>
  );
};

export default AddTransaction;
