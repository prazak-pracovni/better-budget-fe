import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const FlexTableHeaderCell: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      role="columnheader"
      className={`flex flex-1 whitespace-nowrap px-4 py-4 font-semibold text-sm text-gray-700 ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default FlexTableHeaderCell;
