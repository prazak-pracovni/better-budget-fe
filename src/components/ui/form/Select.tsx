import useClickOutside from '@/hooks/useClickOutside';
import { IActionButton } from '@/interfaces/action-button.interface';
import { IOption } from '@/interfaces/option.interface';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FieldError } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  options: IOption[];
  actionButton?: IActionButton;
  placeholder?: string;
  selectedId?: string;
  error?: FieldError;
  fullWidth?: boolean;
  onBlur: (blurred: boolean) => void;
  onSelect: (id: string) => void;
}

const Select: React.FC<Props> = ({
  id,
  label,
  options,
  actionButton,
  placeholder,
  selectedId,
  error,
  fullWidth,
  onBlur,
  onSelect,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOption | undefined>(
    selectedId ? options.find((option) => option.id === selectedId) : undefined,
  );
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    console.log('SelectedId', selectedId);

    if (selectedId) {
      const newSelectedItem = options.find((option) => option.id === selectedId);
      if (newSelectedItem) {
        console.log('Set selected item', newSelectedItem);
        setSelectedItem(newSelectedItem);
      }
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, options]);

  useEffect(() => {
    if (isOpened && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();

      setDropdownStyle({
        width: rect.width,
        top: `${rect.bottom + window.scrollY - 8}px`,
        left: `${rect.left + window.scrollX}px`,
      });
    }
  }, [isOpened]);

  useClickOutside([selectRef, dropdownRef], () => {
    if (isOpened) {
      onBlur(true);
      setIsOpened(false);
    }
  });

  const handleChange = (item: IOption) => {
    onSelect(item.id);
    setSelectedItem(item);
    setIsOpened(false);
  };

  return (
    <div ref={selectRef} className={`flex flex-col items-left ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          onClick={() => setIsOpened(!isOpened)}
          aria-label="Toggle select menu"
          aria-haspopup="true"
          aria-expanded={isOpened}
          type="button"
          className={`w-40 flex gap-x-2 items-center justify-between mt-1 px-3 py-2 rounded-md border bg-white  ${error && 'border-red-500'} ${fullWidth && 'w-full'}`}
        >
          <span
            className={`whitespace-nowrap overflow-hidden text-ellipsis text-sm ${selectedItem ? 'text-gray-700' : 'text-gray-400'}`}
          >
            {selectedItem?.label || placeholder}
          </span>
          <ChevronDownIcon className="w-5 h-5 shrink-0 fill-gray-600"></ChevronDownIcon>
        </button>
        {isOpened &&
          ReactDOM.createPortal(
            <div className="fixed inset-0 z-30">
              <div
                ref={dropdownRef}
                className={`absolute z-30 mt-2 w-56 max-h-96 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${fullWidth && 'w-full'}`}
                style={dropdownStyle}
                role="menu"
              >
                <ul className="p-2">
                  {options.map((option) => (
                    <li
                      key={option.id}
                      onClick={() => handleChange(option)}
                      className={
                        'block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer'
                      }
                    >
                      <span>{option.label}</span>
                    </li>
                  ))}
                </ul>
                {actionButton && (
                  <div className="p-2">
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                      onClick={(e) => {
                        actionButton.onClick(e);
                        setIsOpened(false);
                      }}
                    >
                      {actionButton.label}
                    </button>
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )}
      </div>
      <span className="text-red-500 text-sm min-h-5">{error?.message}</span>
    </div>
  );
};

export default Select;
