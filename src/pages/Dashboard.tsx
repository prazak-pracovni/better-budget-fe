import NoData from '@/components/ui/NoData';
import { useGetCategories } from '@/features/categories/api/useGetCategories';
import Graphs from '@/features/dashboard/components/Graphs';
import RangeSelect from '@/features/dashboard/components/RangeSelect';
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

  console.log('Balance', balance);

  const handleSelectedRange = (range: IRangeOption): void => {
    setSelectedRange(range);
    setTransactionFilter(convertRangeToFilter(range));
  };

  const convertRangeToFilter = (range: IRangeOption): ITransactionsFilter => {
    const startOfUnit = dayjs().startOf(range.unit);
    const endOfUnit = dayjs().endOf(range.unit);

    const startDate = range.value > 0 ? startOfUnit : startOfUnit.add(range.value, range.unit);
    const endDate = range.value > 0 ? endOfUnit : startOfUnit.subtract(1, 'day');

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  };

  if (!transactions || !categories || balance === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col pt-8">
      <div className="ml-auto mb-6">
        <RangeSelect handleRangeSelect={handleSelectedRange} selectedRange={selectedRange} />
      </div>
      {transactions.length ? (
        <Graphs
          transactions={transactions}
          transactionFilter={transactionFilter}
          balance={balance}
          categories={categories}
        />
      ) : (
        <NoData>
          <p className="text-center text-gray-700">
            There are no transactions. You can create new transactions on transaction page.
          </p>
        </NoData>
      )}
    </div>
  );
};

export default Dashboard;
