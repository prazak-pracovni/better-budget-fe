import { Outlet } from 'react-router-dom';
import Header from './AnonymousHeader';

const AnonymousLayout = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-auto">
        <Header />
        <main className="flex-grow w-full max-w-screen-xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AnonymousLayout;
