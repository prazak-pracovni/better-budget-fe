import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '@categories/interfaces/category.interface';
import { useAddCategory } from '@categories/api/useAddCategory';
import Input from '@/components/Form/Input';

interface Props {
  closeModal: () => void;
}

const AddCategoryForm: React.FC<Props> = ({ closeModal }) => {
  const methods = useForm<ICategory>({ mode: 'onTouched' });
  const { mutate } = useAddCategory();

  const onSubmit: SubmitHandler<ICategory> = (category) => {
    mutate(category);
    closeModal();
  };

  return (
    <FormProvider {...methods}>
      <form id="category-form" onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-2">
        <Input
          label="Category name"
          id="title"
          name="title"
          type="text"
          fullWidth={true}
          validation={{
            required: { value: true, message: 'Category name is required' },
          }}
        ></Input>
        <div className="w-full flex flex-col items-center gap-2">
          <button
            type="submit"
            className="inline-block h-full w-full rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Add category
          </button>
          <button type="button" onClick={closeModal} className="inline-block h-full w-full rounded-md border border-gray-100 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCategoryForm;
