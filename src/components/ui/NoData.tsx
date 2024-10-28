import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const NoData: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto my-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <XCircleIcon className="w-6 h-6 stroke-red-500 stroke-2"></XCircleIcon>
          <span className="ml-2 text-lg font-semibold text-gray-700">No data</span>
        </div>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default NoData;
