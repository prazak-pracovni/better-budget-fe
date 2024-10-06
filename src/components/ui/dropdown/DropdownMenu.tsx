import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDropdown } from './useDropdown';
import useClickOutside from '@/hooks/useClickOutside';

interface Props {
  width?: string;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<Props> = ({ children, width }) => {
  const dropdownMenuRef = React.useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const { isOpened, dropdownRef, toggleDropdown } = useDropdown();

  useEffect(() => {
    if (isOpened && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();

      setDropdownStyle({
        width: `${width || rect.width}px`,
        top: `${rect.bottom + window.scrollY - 8}px`,
        left: `${rect.left + window.scrollX}px`,
      });
    }
  }, [isOpened, dropdownRef, width]);

  useClickOutside([dropdownRef, dropdownMenuRef], () => {
    if (isOpened) {
      toggleDropdown();
    }
  });

  return (
    <>
      {isOpened &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-30">
            <div
              role="menu"
              ref={dropdownMenuRef}
              style={dropdownStyle}
              className="absolute z-30 mt-2 w-56 max-h-96 rounded border border-gray-100 bg-white shadow-lg"
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default DropdownMenu;
