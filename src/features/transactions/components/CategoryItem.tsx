import React, { useRef, useState } from 'react';
import { ICategory } from '@transactions/interfaces/category.interface';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import useClickOutside from '@/hooks/useClickOutside';
import { useRemoveCategory } from '../api/useRemoveCategory';

interface Props {
  category: ICategory;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const DropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate: mutateRemove } = useRemoveCategory();

  useClickOutside(DropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleCategoryRemove = () => {
    mutateRemove(category);
  };

  return (
    <div
      key={category.id}
      className="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm"
    >
      <span className="text-sm text-gray-700">{category.title}</span>
      <div className="relative">
        <button className="p-1" onClick={toggleDropdown}>
          <span className="sr-only">Category options</span>
          <EllipsisVerticalIcon className="w-4 h-4"></EllipsisVerticalIcon>
        </button>
        <div
          ref={DropdownRef}
          className={`absolute end-0 z-10 mt-2 w-36 rounded-md border border-gray-100 bg-white shadow-lg ${isDropdownOpen ? 'block' : 'hidden'} `}
          role="menu"
        >
          <div className="p-2">
            <button className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100" role="menuitem">
              Edit
            </button>
            <button onClick={handleCategoryRemove} className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100" role="menuitem">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
