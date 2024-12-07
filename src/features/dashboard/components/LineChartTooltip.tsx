import dayjs from 'dayjs';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const LineChartTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (active) {
    const paresedLabel = dayjs(label).format('MMM DD YYYY')
    return (
      <div className="bg-white p-2 border-2 border-gray-100 rounded-md">
        <div className="flex flex-col gap-y-1">
          <span className="text-xs text-gray-500">{paresedLabel}</span>
          {payload?.length && <span className="text-sm text-gray-700">{`${payload[0].value} CZK`}</span>}
        </div>
      </div>
    );
  }
  return null;
};

export default LineChartTooltip;
