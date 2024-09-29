import React from 'react';

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-8 border-t-blue-600"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
