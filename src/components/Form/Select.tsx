import useClickOutside from '@/hooks/useClickOutside';
import { IActionButton } from '@/interfaces/action-button.interface';
import { IOption } from '@/interfaces/option.interface';
import { TDropdownPosition } from '@/types/dropdown-position';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  options: IOption[];
  actionButton?: IActionButton;
  placeholder?: string;
  selectedId?: string;
  error?: FieldError;
  keepEditing?: boolean;
  position?: TDropdownPosition;
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
  keepEditing,
  position,
  fullWidth,
  onBlur,
  onSelect,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOption | undefined>(
    selectedId ? options.find((option) => option.id === selectedId) : undefined,
  );

  useEffect(() => {
    if (selectedId) {
      const newSelectedItem = options.find((option) => option.id === selectedId);
      if (newSelectedItem) {
        setSelectedItem(newSelectedItem);
      }
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, options]);

  useClickOutside(selectRef, () => {
    if (isOpen && !keepEditing) {
      onBlur(true);
    }
    setIsOpen(false);
  });

  const handleChange = (item: IOption) => {
    onSelect(item.id);
    setIsOpen(false);
  };

  const baseClass = `absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${fullWidth && 'w-full'}`;

  const selectMenuClass = `${baseClass}
    ${position === 'bottom-right' && 'top-full right-0 mt-2'}
    ${position === 'bottom-left' && 'top-full left-0 mt-2'}
    ${position === 'top-right' && 'bottom-full right-0 mb-2'}
    ${position === 'top-left' && 'bottom-full left-0 mb-2'}`;

  return (
    <div ref={selectRef} className={`flex flex-col items-left ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle select menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
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
        {isOpen && (
          <div className={selectMenuClass} role="menu">
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
                  onClick={actionButton.onClick}
                >
                  {actionButton.label}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <span className="text-red-500 text-sm min-h-5">{error?.message}</span>
    </div>
  );
};

export default Select;
