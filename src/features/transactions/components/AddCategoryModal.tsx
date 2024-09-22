import { useState } from 'react';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/16/solid';
import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';

const AddCategoryModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };;


  return (
    <>
      <div>AddCategoryModal</div>
      <button className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow" onClick={openModal}>
        Open modal
      </button>
      <Modal
        isOpen={isModalOpened}
        style={{
          overlay: {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
          content: {
            width: '60vw',
            height: 'calc(100vh - 8rem)',
            margin: 'auto',
            padding: '0px',
            borderRadius: '12px',
          },
        }}
      >
          <div className="w-full flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="font-medium">Categories</h2>
            <button onClick={() => setIsModalOpened(false)}>
              <XMarkIcon className="size-6 text-gray-950" />
            </button>
          </div>
          <div className="w-full flex flex-col p-6">
            <AddCategoryForm></AddCategoryForm>
            <CategoryList></CategoryList>
          </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
