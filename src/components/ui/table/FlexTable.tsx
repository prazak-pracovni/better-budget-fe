import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTable: React.FC<Props> = ({ children }) => {
  return <div role="table" className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg text-sm">{children}</div>;
};

export default FlexTable;
