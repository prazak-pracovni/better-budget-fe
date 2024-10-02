import Modal from 'react-modal';
import AddCategoryForm from './AddCategoryForm';

interface Props {
  isOpened: boolean;
  closeModal: () => void;
}

const AddCategoryModal: React.FC<Props> = ({ isOpened, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isOpened}
        style={{
          overlay: {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 30,
          },
          content: {
            inset: '16rem',
            width: '28rem',
            height: 'max-content',
            margin: '0 auto',
            padding: '0px',
            borderRadius: '12px',
          },
        }}
      >
        <div className="w-full h-full items-center justify-center flex flex-col p-6">
          <h3 className="w-full mb-6 text-lg font-semibold text-gray-700">Add new category</h3>
          <AddCategoryForm closeModal={closeModal}></AddCategoryForm>
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
