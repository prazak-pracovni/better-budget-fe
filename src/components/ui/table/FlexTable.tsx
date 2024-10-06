import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTable: React.FC<Props> = ({ children }) => {
  return <div role="table" className="divide-y-2 divide-gray-200 bg-white text-sm">{children}</div>;
};

export default FlexTable;
