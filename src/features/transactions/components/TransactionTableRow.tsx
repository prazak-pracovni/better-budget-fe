import useClickOutside from '@/hooks/useClickOutside';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useMemo, useRef, useState } from 'react';
import { useRemoveTransaction } from '@transactions/api/useRemoveTransaction';
import { ICategory } from '@categories/interfaces/category.interface';
import { ETransactionType } from '@transactions/enums/transaction-type.enum';
import FlexTableCell from '@/components/ui/table/body/FlexTableCell';
import FlexTableRow from '@/components/ui/table/body/FlexTableRow';

interface Props {
  transaction: ITransaction;
  categories: ICategory[] | undefined;
  openModal: (transaction: ITransaction) => void;
}

const TransactionTableRow: React.FC<Props> = ({ transaction, categories, openModal }) => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate: mutateRemove } = useRemoveTransaction();

  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTransactionEdit = () => {
    setIsDropdownOpen(false);
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
      <FlexTableCell isLast={true}>
        <div className="relative" ref={dropdownRef}>
          <button className="p-1" onClick={toggleDropdown}>
            <span className="sr-only">Category options</span>
            <EllipsisVerticalIcon className="w-4 h-4"></EllipsisVerticalIcon>
          </button>
          <div
            className={`absolute end-0 z-10 mt-2 w-36 rounded-md border border-gray-100 bg-white shadow-lg ${isDropdownOpen ? 'block' : 'hidden'} `}
            role="menu"
          >
            <div className="p-2">
              <button
                onClick={handleTransactionEdit}
                className="block w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Edit
              </button>
              <button
                onClick={handleTransactionRemove}
                className="block w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </FlexTableCell>
    </FlexTableRow>
  );
};

export default TransactionTableRow;
