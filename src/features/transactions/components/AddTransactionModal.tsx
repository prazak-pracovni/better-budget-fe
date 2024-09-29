import Modal from 'react-modal';
import AddTransactionForm from './AddTransactionForm';
import { ICategory } from '@/features/categories/interfaces/category.interface';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface Props {
  categories: ICategory[] | undefined;
  isOpened: boolean;
  closeModal: () => void;
}

const AddCategoryModal: React.FC<Props> = ({ isOpened, closeModal, categories }) => {
  return (
    <>
      <Modal
        isOpen={isOpened}
        style={{
          overlay: {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          },
          content: {
            width: '100%',
            height: 'max-content',
            maxWidth: '35rem',
          
            margin: 'auto',
            padding: '0px',
            borderRadius: '12px',
            zIndex: 1000,
          },
        }}
      >
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between p-6">
            <h3 className="text-lg font-semibold text-gray-700">Add new transaction</h3>
            <button onClick={closeModal}>
              <span className="sr-only">Close modal</span>
              <XMarkIcon className="w-6 h-6"></XMarkIcon>
            </button>
          </div>
          <div className="w-full h-full items-center justify-center flex flex-col p-6">
            <AddTransactionForm categories={categories} closeModal={closeModal}></AddTransactionForm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
