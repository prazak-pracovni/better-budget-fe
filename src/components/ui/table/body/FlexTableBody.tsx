import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTableBody: React.FC<Props> = ({ children }) => {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
};

export default FlexTableBody;
