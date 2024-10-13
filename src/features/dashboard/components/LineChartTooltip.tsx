import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const LineChartTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, label }) => {

  if (active) {
    return (
      <div className="bg-white p-2 border-2 border-gray-100 rounded-md">
        <span className="mb-2 text-sm">{label}</span>
      </div>
    );
  }
  return null;
};

export default LineChartTooltip;
