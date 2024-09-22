import React from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

interface Props {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  validation: RegisterOptions<FieldValues, string>;
  fullWidth?: boolean;
}

const Select: React.FC<Props> = ({ id, name, label, defaultValue, options, validation, fullWidth }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ [x: string]: string }>();

  return (
    <div className={`flex flex-col items-left ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        id={id}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        {...register(name, validation)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-red-500 text-sm min-h-5">{errors[name] ? errors[name]?.message : ' '}</span>
    </div>
  );
};

export default Select;
