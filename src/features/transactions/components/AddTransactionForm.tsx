import Input from '@/components/Form/Input';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useAddTransaction } from '@transactions/api/useAddTransaction';
import Select from '@/components/Form/Select';
import { TRANSACTION_TYPES } from '@transactions/constants/transaction-types';
import { ICategory } from '@categories/interfaces/category.interface';
import AddCategoryModal from '@/features/categories/components/AddCategoryModal';
import { useState } from 'react';

interface Props {
  categories: ICategory[] | undefined;
}

const AddTransactionForm: React.FC<Props> = ({ categories }) => {
  const methods = useForm<ITransaction>({ mode: 'onTouched' });
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { mutate } = useAddTransaction();

  const onSubmit: SubmitHandler<ITransaction> = (transaction) => {
    mutate(transaction);
    methods.reset();
  };

  const openCategoryModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpened(true);
  };

  const closeCategoryModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div className="mb-4">
      <FormProvider {...methods}>
        <form id="transaction-form" onSubmit={methods.handleSubmit(onSubmit)} className="flex items-center gap-6">
          <Input
            label="Transaction name"
            id="title"
            name="title"
            type="text"
            validation={{
              required: { value: true, message: 'Transaction name is required' },
            }}
          ></Input>
          <Input
            label="Amount"
            id="amount"
            name="amount"
            type="number"
            validation={{
              required: { value: true, message: 'Amount is required' },
            }}
          ></Input>
          <Controller
            control={methods.control}
            name="type"
            rules={{ required: { value: true, message: 'Transaction type required' } }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Select
                label="Transaction type"
                id="type"
                options={Object.values(TRANSACTION_TYPES).map((type) => ({
                  id: type.value,
                  label: type.label,
                  value: type.value,
                }))}
                selectedId={value}
                error={error}
                onBlur={onBlur}
                onSelect={onChange}
              ></Select>
            )}
          ></Controller>
          <Controller
            control={methods.control}
            name="categoryId"
            rules={{ required: { value: true, message: 'Category is required' } }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Select
                label="Category"
                id="categoryId"
                placeholder="Select category"
                options={
                  categories?.map((category) => ({ id: category.id, label: category.title, value: category.id })) || []
                }
                actionButton={{ label: '+ Add category', onClick: (e) => openCategoryModal(e) }}
                error={error}
                selectedId={value}
                keepEditing={isModalOpened}
                onBlur={onBlur}
                onSelect={onChange}
              ></Select>
            )}
          ></Controller>
          <Input
            label="Date"
            id="date"
            name="date"
            type="date"
            placeholder="Date"
            validation={{
              required: { value: true, message: 'Date is required' },
            }}
          ></Input>
          <button
            type="submit"
            className="inline-block h-full rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Add transaction
          </button>
        </form>
      </FormProvider>
      <AddCategoryModal isOpened={isModalOpened} closeModal={closeCategoryModal}></AddCategoryModal>
    </div>
  );
};

export default AddTransactionForm;
