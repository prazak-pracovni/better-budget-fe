import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const PieGraphTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
  if (!payload) {
    return null;
  }

  if (active) {
    return (
      <div className="bg-white p-2 border-2 border-gray-100 rounded-md">
        <div className="flex flex-col text-sm">
          <span>{payload[0].name}</span>
          <span>{`${payload[0].value} CZK`}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default PieGraphTooltip;
