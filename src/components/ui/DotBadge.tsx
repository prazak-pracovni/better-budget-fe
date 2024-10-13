import React from 'react';

interface Props {
  color: string;
}

const DotBadge: React.FC<Props> = ({ color }) => {
  return <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }}></span>;
};

export default DotBadge;
