import React from 'react';
import { useDropdown } from './useDropdown';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const DropdownItem: React.FC<Props> = ({ children, onClick }) => {
  const { toggleDropdown } = useDropdown();

  const handleClick = () => {
    onClick();
    toggleDropdown();
  };

  return (
    <button onClick={handleClick} className="block w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100">
      {children}
    </button>
  );
};

export default DropdownItem;
