import React from 'react';

interface Props {
  children: React.ReactNode;
  isLast?: boolean;
}

const FlexTableHeaderCell: React.FC<Props> = ({ children, isLast }) => {
  return (
    <th
      className={`whitespace-nowrap px-4 py-4 font-semibold text-sm text-gray-700  ${isLast ? 'text-left' : 'text-right'}`}
    >
      {children}
    </th>
  );
};

export default FlexTableHeaderCell;
