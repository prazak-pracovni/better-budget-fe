import { ETransactionType } from '@/features/transactions/enums/transaction-type.enum';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import LineChartTooltip from './LineChartTooltip';
import Card from '@/components/ui/card/Card';
import CardHeader from '@/components/ui/card/CardHeader';
import { ITransaction } from '@/features/transactions/interfaces/transaction.interface';

interface Props {
  transactions: ITransaction[];
}

const LineGraph: React.FC<Props> = ({ transactions }) => {
  let cumulativeSum = 0;

  const transactionData = transactions.map((transaction) => {
    cumulativeSum += transaction.type === ETransactionType.EXPENSE ? -transaction.amount : transaction.amount;

    return {
      ...transaction,
      amount: cumulativeSum,
      date: dayjs(transaction.date).format('MMM DD YYYY'),
    };
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="mb-1 text-sm text-gray-700 font-semibold uppercase">Accounts overview</h2>
        <span className="mb-2 text-sm text-gray-600">Net worth</span>
        <span className={`font-semibold ${cumulativeSum > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {`${cumulativeSum > 0 ? '+ ' : ''}${cumulativeSum} CZK`}
        </span>
      </CardHeader>
      <ResponsiveContainer height={360}>
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
          <XAxis dataKey="date" hide={true} />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={15} />
          <Tooltip content={<LineChartTooltip />} />
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
    </Card>
  );
};

export default LineGraph;
