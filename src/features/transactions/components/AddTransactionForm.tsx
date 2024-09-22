import Input from '@/components/Form/Input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useAddTransaction } from '@transactions/api/useAddTransaction';
import Select from '@/components/Form/Select';
import { TRANSACTION_TYPES } from '@transactions/constants/transaction-types';
import { ETransactionType } from '@transactions/enums/transaction-type.enum';
import { ICategory } from '@categories/interfaces/category.interface';

interface Props {
  categories: ICategory[] | undefined;
}

const AddTransactionForm:React.FC<Props> = ({ categories }) => {
  const methods = useForm<ITransaction>({ mode: 'onTouched' });
  const { mutate } = useAddTransaction();

  const onSubmit: SubmitHandler<ITransaction> = (transaction) => {
    mutate(transaction);
    methods.reset();
  };

  return (
    <div className="mb-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex items-center gap-6">
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
          <Select
            label="Type"
            id="type"
            name="type"
            validation={{
              required: { value: true, message: 'Type is required' },
            }}
            defaultValue={ETransactionType.EXPENSE}
            options={Object.values(TRANSACTION_TYPES).map((type) => ({ label: type.label, value: type.value }))}
          ></Select>
          <Select
            label="Category"
            id="categoryId"
            name="categoryId"
            defaultValue={''}
            validation={{
              required: { value: true, message: 'Category is required' },
            }}
            options={categories?.map((category) => ({ label: category.title, value: category.id })) || []}
          ></Select>
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
    </div>
  );
};

export default AddTransactionForm;
