import { ETransactionType } from '@/features/transactions/enums/transaction-type.enum';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import LineChartTooltip from './LineChartTooltip';
import Card from '@/components/ui/card/Card';
import CardHeader from '@/components/ui/card/CardHeader';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { ITransactionsFilter } from '@transactions/interfaces/transactions-filter.interface';

interface Props {
  transactions: ITransaction[];
  transactionFilter: ITransactionsFilter;
  balance: number;
}

const LineGraph: React.FC<Props> = ({ transactions, transactionFilter, balance }) => {
  let cumulativeSum = balance;

  const transactionData = transactions.map((transaction) => {
    cumulativeSum += transaction.type === ETransactionType.EXPENSE ? -transaction.amount : transaction.amount;

    return {
      amount: cumulativeSum,
      date: dayjs(transaction.date).valueOf(),
    };
  });

  const graphData = [
    { amount: balance, date: dayjs(transactionFilter.startDate).valueOf() },
    ...transactionData,
    { date: dayjs(transactionFilter.endDate).valueOf(), amount: transactionData[transactionData.length - 1].amount },
  ];

  const domain = [dayjs(transactionFilter.startDate).valueOf(), dayjs(transactionFilter.endDate).valueOf()];

  return (
    <Card>
      <CardHeader>
        <h2 className="mb-1 text-sm text-gray-700 font-semibold uppercase">Accounts overview</h2>
        <span className="mb-2 text-sm text-gray-600">Net worth</span>
        <span className={`font-semibold ${cumulativeSum > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {`${cumulativeSum > 0 ? '+ ' : ''}${cumulativeSum} CZK`}
        </span>
      </CardHeader>
      <ResponsiveContainer height={360} className="mb-6">
        <LineChart
          className="text-sm"
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" scale="time" type="number" domain={domain} hide={true} />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={15} />
          <Tooltip content={<LineChartTooltip />} />
          <Line
            yAxisId="left"
            type="linear"
            dataKey="amount"
            stroke="#1d4ed8"
            fill="#1d4ed8"
            dot={false}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineGraph;
