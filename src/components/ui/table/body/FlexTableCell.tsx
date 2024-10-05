import React from 'react';

interface Props {
  children: React.ReactNode;
  isLast?: boolean;
}

const FlexTableCell: React.FC<Props> = ({ children, isLast }) => {
  return (
    <td className={`whitespace-nowrap px-4 py-4 text-gray-700  ${isLast && 'text-right'}`}>{children}</td>
  );
};

export default FlexTableCell;
