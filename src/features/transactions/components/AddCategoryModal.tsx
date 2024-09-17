import { useState } from 'react';
import Modal from 'react-modal';

const AddCategoryModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      <div>AddCategoryModal</div>
      <button className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow" onClick={openModal}>
        Open modal
      </button>
      <Modal isOpen={isModalOpened}>
        <h2>Some random modal content</h2>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
