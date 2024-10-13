import { Outlet } from 'react-router-dom';
import ProtectedHeader from './ProtectedHeader';

const ProtectedLayout = () => {
  return (
    <>
      <ProtectedHeader />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-screen-xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProtectedLayout;
