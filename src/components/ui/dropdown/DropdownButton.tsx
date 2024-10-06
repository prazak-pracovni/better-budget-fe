import React from 'react';
import { useDropdown } from '@/components/ui/dropdown/useDropdown';

interface Props {
  children: React.ReactNode;
}

const DropdownButton: React.FC<Props> = ({ children }) => {
  const { toggleDropdown } = useDropdown();

  return (
    <button onClick={toggleDropdown} className="dropdown-button">
      {children}
    </button>
  );
};

export default DropdownButton;
