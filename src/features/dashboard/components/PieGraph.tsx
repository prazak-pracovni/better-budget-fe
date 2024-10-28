import Card from '@/components/ui/card/Card';
import CardHeader from '@/components/ui/card/CardHeader';
import { ICategory } from '@/features/categories/interfaces/category.interface';
import { ITransaction } from '@/features/transactions/interfaces/transaction.interface';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import PieGraphTooltip from './PieGraphTooltip';
import DotBadge from '@/components/ui/DotBadge';
import { DEFAULT_COLOR } from '@/constants/color';

interface Props {
  transactions: ITransaction[];
  categories?: ICategory[];
}

const PieGraph: React.FC<Props> = ({ transactions, categories }) => {
  const groupedAmounts = transactions.reduce(
    (grouped: { [key: string]: number }, transaction: ITransaction) => {
      const { categoryId, amount } = transaction;

      if (!grouped[categoryId]) {
        grouped[categoryId] = 0;
      }

      grouped[categoryId] += amount;

      return grouped;
    },
    {} as { [key: string]: number },
  );

  const chartData = Object.entries(groupedAmounts).map(([key, value]) => {
    const category = categories?.find((category) => category.id === key);
    return { name: category?.title || '', amount: value, color: category?.color || DEFAULT_COLOR };
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="mb-1 text-sm text-gray-700 font-semibold uppercase">Expenses by category</h2>
      </CardHeader>
      <ResponsiveContainer height={360}>
        <PieChart height={300} width={500}>
          <Pie
            data={chartData}
            cx={280}
            cy={150}
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="amount"
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<PieGraphTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex flex-col gap-y-2">
        {chartData.map((entry) => {
          return (
            <li key={entry.name}>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-3">
                  <DotBadge color={entry.color} />
                  <span className="text-sm text-gray-700">{entry.name}</span>
                </div>
                <span className="text-sm text-gray-700">{`${entry.amount} CZK`}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default PieGraph;
