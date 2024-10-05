import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FlexTable: React.FC<Props> = ({ children }) => {
  return <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">{children}</table>;
};

export default FlexTable;
