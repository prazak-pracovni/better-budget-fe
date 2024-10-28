import { useGetCategories } from '@/features/categories/api/useGetCategories';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import TransactionTable from '@transactions/components/TransactionTable';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import TransactionModal from '@transactions/components/TransactionModal';

const ManageTransactions = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | undefined>(undefined);
  const { data: categories } = useGetCategories();

  const closeModal = () => {
    setTransactionToEdit(undefined);
    setIsModalOpened(false);
  };

  const openModal = (transactionToEdit?: ITransaction) => {
    setTransactionToEdit(transactionToEdit);
    setIsModalOpened(true);
  };

  return (
    <div className="flex flex-col items-end pt-8">
      <div className="mb-4">
        <Button variant="primary" type="button" onClick={() => openModal(undefined)}>
          + Add transaction
        </Button>
        <TransactionModal
          categories={categories}
          isOpened={isModalOpened}
          transactionToEdit={transactionToEdit}
          closeModal={closeModal}
        />
      </div>
      <div className="w-full">
        <TransactionTable categories={categories} openModal={openModal} />
      </div>
    </div>
  );
};

export default ManageTransactions;
