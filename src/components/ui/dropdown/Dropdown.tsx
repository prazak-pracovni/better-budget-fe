import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface IDropdownContext {
  isOpened: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  toggleDropdown: () => void;
}

export const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext);

const Dropdown: React.FC<Props> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <DropdownContext.Provider value={{ isOpened, dropdownRef, toggleDropdown }}>
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
