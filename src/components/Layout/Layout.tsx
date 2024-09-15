import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
