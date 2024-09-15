import { Link } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';

const ProtectedHeader = () => {
  const logout = useLogout();

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" to={'/dashboard'}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" to={'/transactions'}>
                    Transactions
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <div className="hidden sm:flex">
                  <button
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProtectedHeader;
