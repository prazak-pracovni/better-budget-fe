import Modal from 'react-modal';
import { ICategory } from '@/features/categories/interfaces/category.interface';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import TransactionForm from '@transactions/components/TransactionForm';
interface Props {
  categories?: ICategory[];
  isOpened: boolean;
  transactionToEdit?: ITransaction;
  closeModal: () => void;
}

const TransactionModal: React.FC<Props> = ({ isOpened, categories, transactionToEdit, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isOpened}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 30,
          },
          content: {
            inset: '5rem',
            width: '35rem',
            height: 'max-content',
            maxHeight: 'calc(100vh - 10rem)',
            overflow: 'hidden',
            padding: '0px',
            margin: '0 auto',
            borderRadius: '12px',
          },
        }}
      >
        <div className="divide-y h-full divide-gray-100">
          <div className="flex items-center justify-between p-6">
            <h3 className="text-lg font-semibold text-gray-700">{transactionToEdit ? 'Edit transaction' : 'Add transaction'}</h3>
            <button onClick={closeModal}>
              <span className="sr-only">Close modal</span>
              <XMarkIcon className="w-6 h-6"></XMarkIcon>
            </button>
          </div>
          <div className="w-full h-full max-h-[calc(100vh-14.75rem)] overflow-y-auto p-6">
            <TransactionForm categories={categories} transactionToEdit={transactionToEdit} closeModal={closeModal}></TransactionForm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransactionModal;
