import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardHeader: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col mb-10">{children}</div>;
};

export default CardHeader;
