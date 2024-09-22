import useClickOutside from '@/hooks/useClickOutside';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { useMemo, useRef, useState } from 'react';
import { useRemoveTransaction } from '@transactions/api/useRemoveTransaction';
import { ICategory } from '@categories/interfaces/category.interface';
import { ETransactionType } from '@transactions/enums/transaction-type.enum';

interface Props {
  transaction: ITransaction;
  categories: ICategory[] | undefined;
}

const TransactionItem: React.FC<Props> = ({ transaction, categories }) => {
  const DropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate: mutateRemove } = useRemoveTransaction();

  useClickOutside(DropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <div key={transaction.id} className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <span className="flex-1">{transaction.title}</span>
        <span className="flex-1">{categoryTitle}</span>
        <span className={`flex-1 font-semibold ${transaction.type === ETransactionType.EXPENSE ? 'text-red-500' : 'text-green-500'}`}>
          {transactionAmount}
        </span>
        <div className="relative">
          <button className="p-1" onClick={toggleDropdown}>
            <span className="sr-only">Category options</span>
            <EllipsisVerticalIcon className="w-4 h-4"></EllipsisVerticalIcon>
          </button>
          <div
            ref={DropdownRef}
            className={`absolute end-0 z-10 mt-2 w-36 rounded-md border border-gray-100 bg-white shadow-lg ${isDropdownOpen ? 'block' : 'hidden'} `}
            role="menu"
          >
            <div className="p-2">
              <button
                className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Edit
              </button>
              <button
                onClick={handleTransactionRemove}
                className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
