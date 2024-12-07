import { IRangeOption } from '@/features/dashboard/interfaces/range-option.interface';

export const RANGE_OPTIONS: IRangeOption[] = [
  {
    label: 'This week',
    value: 1,
    unit: 'week',
  },
  {
    label: 'This month',
    value: 1,
    unit: 'month',
  },
  {
    label: 'Last 3 months',
    value: -3,
    unit: 'month',
  },
  {
    label: 'Last 6 months',
    value: -6,
    unit: 'month',
  },
  {
    label: 'This year',
    value: 1,
    unit: 'year',
  },
];
