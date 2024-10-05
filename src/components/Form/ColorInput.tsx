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

const ColorInput: React.FC<Props> = ({
  id,
  type,
  name,
  label,
  placeholder,
  validation,
  fullWidth,
  showLabel = true,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ [x: string]: string }>();

  return (
    <div className={`flex flex-col items-center ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700 ${!showLabel && 'sr-only'}`}>
        {label}
      </label>
      <div className="w-8 h-8 rounded-md overflow-hidden mt-1.5 mb-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          autoComplete="off"
          className="w-full h-full cursor-pointer scale-150"
        />
      </div>
      <span className="text-red-500 text-sm min-h-5">{errors[name] ? errors[name]?.message : ' '}</span>
    </div>
  );
};

export default ColorInput;
