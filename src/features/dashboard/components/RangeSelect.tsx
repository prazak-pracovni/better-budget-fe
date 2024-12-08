import Dropdown from '@/components/ui/dropdown/Dropdown';
import DropdownButton from '@/components/ui/dropdown/DropdownButton';
import DropdownItem from '@/components/ui/dropdown/DropdownItem';
import DropdownMenu from '@/components/ui/dropdown/DropdownMenu';
import { RANGE_OPTIONS } from '@/features/dashboard/constants/range-options.constants';
import { IRangeOption } from '@/features/dashboard/interfaces/range-option.interface';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Props {
  selectedRange: IRangeOption;
  handleRangeSelect: (range: IRangeOption) => void;
}

const RangeSelect: React.FC<Props> = ({ handleRangeSelect }) => {
  return (
    <Dropdown>
      <DropdownButton>
        <div className="flex items-center gap-x-2">
          <span className="">Select period</span>
          <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
        </div>
      </DropdownButton>
      <DropdownMenu width="10rem">
        {RANGE_OPTIONS.map((option) => (
          <DropdownItem onClick={() => handleRangeSelect(option)} key={option.label}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default RangeSelect;
