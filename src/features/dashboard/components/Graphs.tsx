import { useGetTransactions } from '@/features/transactions/api/useGetTransactions';
import { ETransactionType } from '@/features/transactions/enums/transaction-type.enum';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Graphs = () => {
  const { data: transactions, isLoading } = useGetTransactions();

  let cumulativeSum = 0;

  const transactionData = transactions?.map((transaction) => {
    cumulativeSum += transaction.type === ETransactionType.EXPENSE ? -transaction.amount : transaction.amount;

    return {
      ...transaction,
      amount: cumulativeSum,
      date: dayjs(transaction.date).format('MMM DD YYYY'),
    };
  });

  return (
    <ResponsiveContainer width="50%" height={400}>
      <LineChart
        className="text-sm"
        width={500}
        height={300}
        data={transactionData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" hide={true} padding={{ right: 20 }} />
        <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={10} />
        <Tooltip />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="amount"
          stroke="#1d4ed8"
          fill="#1d4ed8"
          dot={false}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graphs;
