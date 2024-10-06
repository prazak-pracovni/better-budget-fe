import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '@categories/interfaces/category.interface';
import { useAddCategory } from '@categories/api/useAddCategory';
import Input from '@/components/ui/form/Input';
import Button from '@/components/ui/Button';
import ColorInput from '@/components/ui/form/ColorInput';

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
        <div className="w-full flex items-center justify-between gap-4">
          <ColorInput label="Color" id="color" name="color" type="color"></ColorInput>
          <Input
            fullWidth={true}
            label="Name"
            id="category-title"
            name="title"
            type="text"
            validation={{
              required: { value: true, message: 'Category name is required' },
            }}
          ></Input>
        </div>
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
