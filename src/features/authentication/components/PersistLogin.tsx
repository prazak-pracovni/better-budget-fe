import { useEffect, useState } from 'react';
import useRefreshToken from '@authentication/api/useRefreshToken';
import { Outlet } from 'react-router-dom';
import useAuth from '@authentication/hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken, refresh]);

  return isLoading ? <div>Loading...</div> : <Outlet />;
};

export default PersistLogin;
