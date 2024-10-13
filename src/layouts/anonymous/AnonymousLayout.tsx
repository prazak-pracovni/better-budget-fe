import { Outlet } from 'react-router-dom';
import Header from './AnonymousHeader';

const AnonymousLayout = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AnonymousLayout;
