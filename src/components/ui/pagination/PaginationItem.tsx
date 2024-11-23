import React from 'react';

interface Props {
  isSelected?: boolean;
  onPageChange: () => void;
  children: React.ReactNode;
}

const PaginationItem: React.FC<Props> = ({ children, isSelected, onPageChange }) => {
  return (
    <li>
      <button
        type="button"
        onClick={onPageChange}
        className={`inline-flex size-9 items-center justify-center rounded border  ${isSelected ? 'border-blue-600 bg-blue-600  text-white' : 'border-gray-200 bg-white text-gray-900'}`}
      >
        {children}
      </button>
    </li>
  );
};

export default PaginationItem;
