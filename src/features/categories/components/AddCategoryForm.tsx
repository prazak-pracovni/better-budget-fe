import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '@categories/interfaces/category.interface';
import { useAddCategory } from '@categories/api/useAddCategory';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

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
      <form
        id="category-form"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-2"
      >
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
          <Button variant="primary" type="submit">
            Add category
          </Button>
          <Button variant="tertiary" type="button" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCategoryForm;
