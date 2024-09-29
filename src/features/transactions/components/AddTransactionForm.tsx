import Input from '@/components/form/Input';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useAddTransaction } from '@transactions/api/useAddTransaction';
import Select from '@/components/form/Select';
import { TRANSACTION_TYPES } from '@transactions/constants/transaction-types';
import { ICategory } from '@categories/interfaces/category.interface';
import AddCategoryModal from '@/features/categories/components/AddCategoryModal';
import { useState } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  categories: ICategory[] | undefined;
  closeModal: () => void;
}

const AddTransactionForm: React.FC<Props> = ({ categories, closeModal }) => {
  const methods = useForm<ITransaction>({ mode: 'onTouched' });
  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false);
  const { mutate } = useAddTransaction();

  const onSubmit: SubmitHandler<ITransaction> = (transaction) => {
    mutate(transaction);
    closeModal();
  };

  const openCategoryModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCategoryModalOpened(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpened(false);
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          id="transaction-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4"
        >
          <Input
            label="Transaction name"
            id="title"
            name="title"
            type="text"
            fullWidth={true}
            validation={{
              required: { value: true, message: 'Transaction name is required' },
            }}
          ></Input>
          <Input
            label="Amount"
            id="amount"
            name="amount"
            type="number"
            fullWidth={true}
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
                placeholder="Select transaction type"
                fullWidth={true}
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
                fullWidth={true}
                options={
                  categories?.map((category) => ({ id: category.id, label: category.title, value: category.id })) || []
                }
                actionButton={{ label: '+ Add category', onClick: (e) => openCategoryModal(e) }}
                error={error}
                selectedId={value}
                keepEditing={isCategoryModalOpened}
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
            fullWidth={true}
            placeholder="Date"
            validation={{
              required: { value: true, message: 'Date is required' },
            }}
          ></Input>
          <div className="w-full flex items-center gap-2">
            <Button variant="tertiary" fullWidth={true} type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" fullWidth={true} type="submit">
              Add transaction
            </Button>
          </div>
        </form>
      </FormProvider>
      <AddCategoryModal isOpened={isCategoryModalOpened} closeModal={closeCategoryModal}></AddCategoryModal>
    </div>
  );
};

export default AddTransactionForm;
