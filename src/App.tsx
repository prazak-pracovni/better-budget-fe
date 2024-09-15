import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout';
import Transactions from './pages/Transactions';
import PersistLogin from './components/PersistLogin';
import ProtectedHeader from './components/Layout/Protected/ProtectedHeader';
import ProtectedLayout from './components/Layout/Protected/ProtectedLayout';
import AnonymousLayout from './components/Layout/Anonymous/AnonymousLayout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <AnonymousLayout />,
        children: [
          {
            path: '/',
            element: <Homepage />,
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <PersistLogin />,
            children: [
              {
                element: <ProtectedRoute />,
                children: [
                  {
                    element: <ProtectedHeader />,
                  },
                  {
                    path: '/dashboard',
                    element: <Dashboard />,
                  },
                  {
                    path: '/transactions',
                    element: <Transactions />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
