import { useGetCategories } from '@/features/categories/api/useGetCategories';
import TransactionList from './TransactionList';
import { useState } from 'react';
import AddTransactionModal from './AddTransactionModal';

const AddTransaction = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data: categories } = useGetCategories();

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div className="flex flex-col items-end">
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpened(true)}
          type="button"
          className="inline-block h-full rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        >
          + Add transaction
        </button>
        <AddTransactionModal categories={categories} isOpened={isModalOpened} closeModal={closeModal} />
      </div>
      <div className="w-full">
        <TransactionList categories={categories} />
      </div>
    </div>
  );
};

export default AddTransaction;
