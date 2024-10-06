import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTableBody: React.FC<Props> = ({ children }) => {
  return <div className="bg-white divide-y divide-gray-200">{children}</div>;
};

export default FlexTableBody;
