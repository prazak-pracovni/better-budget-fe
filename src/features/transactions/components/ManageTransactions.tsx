import { useGetCategories } from '@/features/categories/api/useGetCategories';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import TransactionModal from '@transactions/components/TransactionModal';
import TransactionsHistory from '@/features/transactions/components/TransactionsHistory';

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

  if (!categories) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-6 pt-8">
      <div className="ml-auto">
        <Button variant="primary" type="button" onClick={() => openModal(undefined)}>
          + Add transaction
        </Button>
      </div>
      <TransactionModal
        categories={categories}
        isOpened={isModalOpened}
        transactionToEdit={transactionToEdit}
        closeModal={closeModal}
      />
      <TransactionsHistory categories={categories} openModal={openModal} />
    </div>
  );
};

export default ManageTransactions;
