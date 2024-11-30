import { Outlet } from 'react-router-dom';
import ProtectedHeader from './ProtectedHeader';

const ProtectedLayout = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-auto bg-gray-50">
        <ProtectedHeader />
        <main className="flex-grow w-full max-w-screen-xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProtectedLayout;
