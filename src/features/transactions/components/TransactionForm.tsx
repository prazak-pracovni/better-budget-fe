import Input from '@/components/ui/form/Input';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useAddTransaction } from '@transactions/api/useAddTransaction';
import Select from '@/components/ui/form/Select';
import { TRANSACTION_TYPES } from '@transactions/constants/transaction-types';
import { ICategory } from '@categories/interfaces/category.interface';
import AddCategoryModal from '@/features/categories/components/AddCategoryModal';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { usePatchTransaction } from '@transactions/api/usePatchTransaction';

interface Props {
  categories: ICategory[] | undefined;
  transactionToEdit?: ITransaction;
  closeModal: () => void;
}

const TransactionForm: React.FC<Props> = ({ categories, transactionToEdit, closeModal }) => {
  const methods = useForm<ITransaction>({ mode: 'onTouched', defaultValues: transactionToEdit });
  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false);
  const { mutate: mutateAdd } = useAddTransaction();
  const { mutate: mutateEdit } = usePatchTransaction();

  const onSubmit: SubmitHandler<ITransaction> = (transactionToSubmit) => {
    if (transactionToEdit) {
      mutateEdit(transactionToSubmit);
    } else {
      mutateAdd(transactionToSubmit);
    }
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
    <div className="w-full h-full">
      <FormProvider {...methods}>
        <form
          id="transaction-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4"
        >
          <Input
            label="Name"
            id="transaction-title"
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
              min: { value: 0, message: 'Amount must be greater than 0' },
              valueAsNumber: true,
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
                error={error}
                selectedId={value}
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
              {transactionToEdit ? 'Update trasnaction' : 'Add transaction'}
            </Button>
          </div>
        </form>
      </FormProvider>
      <AddCategoryModal isOpened={isCategoryModalOpened} closeModal={closeCategoryModal}></AddCategoryModal>
    </div>
  );
};

export default TransactionForm;
