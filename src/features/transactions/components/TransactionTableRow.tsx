import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useRemoveTransaction } from '@transactions/api/useRemoveTransaction';
import { ICategory } from '@categories/interfaces/category.interface';
import { ETransactionType } from '@transactions/enums/transaction-type.enum';
import FlexTableCell from '@/components/ui/table/body/FlexTableCell';
import FlexTableRow from '@/components/ui/table/body/FlexTableRow';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import DropdownButton from '@/components/ui/dropdown/DropdownButton';
import DropdownMenu from '@/components/ui/dropdown/DropdownMenu';
import DropdownItem from '@/components/ui/dropdown/DropdownItem';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  transaction: ITransaction;
  categories: ICategory[];
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

  const transactionContent = useMemo(() => {
    return {
      title: transaction.title,
      category: categories.find((category) => category.id === transaction.categoryId)?.title || 'Unknown Category',
      date: dayjs(transaction.date).format('DD/MM/YYYY'),
      amount: transaction.type === ETransactionType.EXPENSE ? `-${transaction.amount}` : `${transaction.amount}`,
    };
  }, [transaction, categories]);

  return (
    <FlexTableRow>
      <FlexTableCell>{transactionContent.title}</FlexTableCell>
      <FlexTableCell>{transactionContent.category}</FlexTableCell>
      <FlexTableCell>
        <span
          className={`font-medium ${transaction.type === ETransactionType.EXPENSE ? 'text-red-500' : 'text-green-500'}`}
        >
          {transactionContent.amount}
        </span>
      </FlexTableCell>
      <FlexTableCell>{transactionContent.date}</FlexTableCell>
      <FlexTableCell className="justify-end">
        <Dropdown>
          <DropdownButton>
            <span className="sr-only">Category options</span>
            <EllipsisVerticalIcon className="w-4 h-4"></EllipsisVerticalIcon>
          </DropdownButton>
          <DropdownMenu width="140">
            <DropdownItem onClick={handleTransactionEdit}>
              <PencilIcon className="w-4 h-4" />
              Edit
            </DropdownItem>
            <DropdownItem onClick={handleTransactionRemove}>
              <TrashIcon className="w-4 h-4"></TrashIcon>
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </FlexTableCell>
    </FlexTableRow>
  );
};

export default TransactionTableRow;
