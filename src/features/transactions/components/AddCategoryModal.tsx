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
      <Modal isOpen={isModalOpened} style={{ overlay: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }, content: {
        width: '60vw',
        height: 'calc(100vh - 8rem)',
        margin: 'auto',
        padding: '0px',
        borderRadius: '12px'
      } }}>
        <div className="w-full flex items-center justify-between p-6 border-b border-gray-700/[0.2]">
          <h2>Categories</h2>
          <button onClick={() => setIsModalOpened(false)}>x</button>
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
