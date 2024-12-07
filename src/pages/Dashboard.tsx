import NoData from '@/components/ui/NoData';
import { useGetCategories } from '@/features/categories/api/useGetCategories';
import Graphs from '@/features/dashboard/components/Graphs';
import RangeSelect from '@/features/dashboard/components/PeriodSelect';
import { RANGE_OPTIONS } from '@/features/dashboard/constants/range-options.constants';
import { IRangeOption } from '@/features/dashboard/interfaces/range-option.interface';
import { useGetBalance } from '@/features/transactions/api/useGetBalance';
import { useGetTransactionsData } from '@transactions/api/useGetTransactionsData';
import { ITransactionsFilter } from '@transactions/interfaces/transactions-filter.interface';
import dayjs from 'dayjs';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState<IRangeOption>(RANGE_OPTIONS[5]);
  const [transactionFilter, setTransactionFilter] = useState<ITransactionsFilter>({
    startDate: dayjs().startOf('year').toISOString(),
    endDate: dayjs().endOf('year').toISOString(),
  });

  const { data: transactionsData } = useGetTransactionsData('ASC', transactionFilter);
  const { data: balance } = useGetBalance(transactionFilter.startDate);
  const { data: categories } = useGetCategories();

  const transactions = transactionsData?.transactions;

  const handleSelectedRange = (range: IRangeOption) => {
    setSelectedRange(range);
    setTransactionFilter({
      startDate:
        range.value > 0
          ? dayjs().startOf(range.unit).toISOString()
          : dayjs().startOf(range.unit).add(range.value, range.unit).toISOString(),
      endDate: dayjs().endOf(range.unit).toISOString(),
    });
  };

  if (!transactions || !categories || balance === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col pt-8">
      {transactions.length ? (
        <>
          <div className="ml-auto mb-6">
            <RangeSelect handleRangeSelect={handleSelectedRange} selectedRange={selectedRange} />
          </div>
          <Graphs
            transactions={transactions}
            transactionFilter={transactionFilter}
            balance={balance}
            categories={categories}
          />
        </>
      ) : (
        <NoData>
          <p className="text-center text-gray-700">
            There are no transactions yet. You can create new transactions on transaction page.
          </p>
        </NoData>
      )}
    </div>
  );
};

export default Dashboard;
