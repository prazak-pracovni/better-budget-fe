import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const FlexTableCell: React.FC<Props> = ({ children, className }) => {
  return (
    <div role="cell" className={`flex flex-1 whitespace-nowrap px-4 py-4 text-gray-700 ${className || ''}`}>
      {children}
    </div>
  );
};

export default FlexTableCell;
