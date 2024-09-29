import { useGetCategories } from '@/features/categories/api/useGetCategories';
import TransactionList from './TransactionList';
import { useState } from 'react';
import AddTransactionModal from './AddTransactionModal';
import Button from '@/components/ui/Button';

const AddTransaction = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data: categories } = useGetCategories();

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div className="flex flex-col items-end">
      <div className="mb-4">
        <Button variant="primary" type="button" onClick={() => setIsModalOpened(true)}>
          + Add transaction
        </Button>
        <AddTransactionModal categories={categories} isOpened={isModalOpened} closeModal={closeModal} />
      </div>
      <div className="w-full">
        <TransactionList categories={categories} />
      </div>
    </div>
  );
};

export default AddTransaction;
