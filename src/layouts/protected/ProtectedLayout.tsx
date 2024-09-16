import { Outlet } from 'react-router-dom';
import ProtectedHeader from './ProtectedHeader';

const ProtectedLayout = () => {
  return (
    <>
      <ProtectedHeader />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
