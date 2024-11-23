import { TButtonVariant } from '@/types/button-variant.type';
import React from 'react';

interface Props {
  variant: TButtonVariant;
  type: 'button' | 'submit';
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ variant, type, children, fullWidth, onClick }) => {
  const baseClass = `inline-block h-full rounded-md border px-6 py-2 text-sm font-medium transition focus:outline-none focus:ring ${fullWidth && 'w-full'}`;

  const btnClass = `${baseClass}
    ${variant === 'primary' && 'border-blue-600 bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 active:text-blue-500'}
    ${variant === 'secondary' && 'border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-600'}
    ${variant === 'tertiary' && 'border-gray-100 bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200'}`;

  return (
    <button onClick={onClick} type={type} className={btnClass}>
      {children}
    </button>
  );
};

export default Button;
