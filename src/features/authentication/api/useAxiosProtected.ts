import { axiosProtected } from '@/api/axios';
import { useEffect } from 'react';
import useRefreshToken from '@authentication/api/useRefreshToken';
import useAuth from '@authentication/hooks/useAuth';

const useAxiosProtected = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosProtected.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosProtected.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error.response.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosProtected(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestInterceptor);
      axiosProtected.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosProtected;
};

export default useAxiosProtected;
