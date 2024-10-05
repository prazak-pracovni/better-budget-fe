import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTableHeader: React.FC<Props> = ({ children }) => {
  return <thead className="bg-gray-100 border-t border-gray-200">{children}</thead>;
};

export default FlexTableHeader;
