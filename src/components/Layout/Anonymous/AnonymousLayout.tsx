import { Outlet } from 'react-router-dom';
import Header from './AnonymousHeader';

const AnonymousLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AnonymousLayout;
