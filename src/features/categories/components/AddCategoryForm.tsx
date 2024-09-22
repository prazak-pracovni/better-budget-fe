import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '@categories/interfaces/category.interface';
import { useAddCategory } from '@categories/api/useAddCategory';
import Input from '@/components/Form/Input';

const AddCategoryForm = () => {
  const methods = useForm<ICategory>({ mode: 'onTouched' });
  const { mutate } = useAddCategory();

  const onSubmit: SubmitHandler<ICategory> = (category) => {
    mutate(category);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex items-center gap-6">
        <Input
          label="Category title"
          id="title"
          name="title"
          type="text"
          validation={{
            required: { value: true, message: 'Category title is required' },
          }}
        ></Input>
        <button
          type="submit"
          className="inline-block h-full rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        >
          Add category
        </button>
      </form>
    </FormProvider>
  );
};

export default AddCategoryForm;
