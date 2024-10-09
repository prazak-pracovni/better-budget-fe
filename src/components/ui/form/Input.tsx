import React, { HTMLInputTypeAttribute } from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

interface Props {
  id: string;
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  validation?: RegisterOptions<FieldValues, string>;
  fullWidth?: boolean;
  showLabel?: boolean;
  placeholder?: string;
}

const Input: React.FC<Props> = ({ id, type, name, label, placeholder, validation, fullWidth, showLabel = true }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ [x: string]: string }>();


  return (
    <div className={`flex flex-col items-left ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700 ${!showLabel && 'sr-only'}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        autoComplete="off"
        className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${errors[name] && 'border-red-500'}`}
      />
      <span className="text-red-500 text-sm min-h-5">{errors[name] ? errors[name]?.message : ' '}</span>
    </div>
  );
};

export default Input;
