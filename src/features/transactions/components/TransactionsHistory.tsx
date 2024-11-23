import NoData from '@/components/ui/NoData';
import Pagination from '@/components/ui/pagination/Pagination';
import TransactionTable from '@transactions/components/TransactionsTable';
import React, { useState } from 'react';
import { ITransactionsFilter } from '@transactions/interfaces/transactions-filter.interface';
import { useGetTransactionsData } from '@transactions/api/useGetTransactionsData';
import { ITransaction } from '@/features/transactions/interfaces/transaction.interface';
import { ICategory } from '@categories/interfaces/category.interface';

interface Props {
  categories?: ICategory[];
  openModal: (transaction?: ITransaction) => void;
}

const TransactionsHistory: React.FC<Props> = ({ categories, openModal }) => {
  const [transactionFilter, setTransactionFilter] = useState<ITransactionsFilter>({ page: 1, limit: 10 });

  const { data: transactionsData } = useGetTransactionsData('DESC', transactionFilter);

  const onPageChange = (page: number) => {
    setTransactionFilter({ ...transactionFilter, page });
  };

  if (!transactionsData || !categories) {
    return null;
  }

  return (
    <>
      {transactionsData.transactions.length ? (
        <>
          <TransactionTable
            transactions={transactionsData.transactions}
            categories={categories}
            openModal={openModal}
          />
          {transactionFilter.page && transactionFilter.limit && (
            <Pagination
              itemCount={transactionsData.total}
              pageSize={transactionFilter.limit}
              currentPage={transactionFilter.page}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <NoData>
          <p className="text-center text-gray-700">
            There are no transactions yet. You can create new transaction by clicking add transaction button.
          </p>
        </NoData>
      )}
    </>
  );
};

export default TransactionsHistory;
