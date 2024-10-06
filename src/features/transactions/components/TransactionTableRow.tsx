import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useMemo } from 'react';
import { useRemoveTransaction } from '@transactions/api/useRemoveTransaction';
import { ICategory } from '@categories/interfaces/category.interface';
import { ETransactionType } from '@transactions/enums/transaction-type.enum';
import FlexTableCell from '@/components/ui/table/body/FlexTableCell';
import FlexTableRow from '@/components/ui/table/body/FlexTableRow';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import DropdownButton from '@/components/ui/dropdown/DropdownButton';
import DropdownMenu from '@/components/ui/dropdown/DropdownMenu';
import DropdownItem from '@/components/ui/dropdown/DropdownItem';

interface Props {
  transaction: ITransaction;
  categories: ICategory[] | undefined;
  openModal: (transaction: ITransaction) => void;
}

const TransactionTableRow: React.FC<Props> = ({ transaction, categories, openModal }) => {
  const { mutate: mutateRemove } = useRemoveTransaction();

  const handleTransactionEdit = () => {
    openModal(transaction);
  };

  const handleTransactionRemove = () => {
    mutateRemove(transaction);
  };

  const categoryTitle = useMemo(() => {
    return categories?.find((category) => category.id === transaction.categoryId)?.title || 'Unknown Category';
  }, [transaction, categories]);

  const transactionAmount = useMemo(() => {
    return transaction.type === ETransactionType.EXPENSE ? `-${transaction.amount}` : `${transaction.amount}`;
  }, [transaction]);

  return (
    <FlexTableRow>
      <FlexTableCell>{transaction.title}</FlexTableCell>
      <FlexTableCell>{categoryTitle}</FlexTableCell>
      <FlexTableCell>
        <span
          className={`font-medium ${transaction.type === ETransactionType.EXPENSE ? 'text-red-500' : 'text-green-500'}`}
        >
          {transactionAmount}
        </span>
      </FlexTableCell>
      <FlexTableCell className="justify-end">
        <Dropdown>
          <DropdownButton>
            <span className="sr-only">Category options</span>
            <EllipsisVerticalIcon className="w-4 h-4"></EllipsisVerticalIcon>
          </DropdownButton>
          <DropdownMenu width="140">
            <DropdownItem onClick={handleTransactionEdit}>Edit</DropdownItem>
            <DropdownItem onClick={handleTransactionRemove}>Remove</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </FlexTableCell>
    </FlexTableRow>
  );
};

export default TransactionTableRow;
