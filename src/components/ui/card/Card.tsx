import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return <div className="w-2/4 p-6 rounded-md bg-white">{children}</div>;
};

export default Card;
