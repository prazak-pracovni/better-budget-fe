import axios from '@/api/axios';
import useAuth from '@authentication/hooks/useAuth';

interface IRefreshTokenResponse {
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
    const response = await axios.post<IRefreshTokenResponse>('/api/auth/refresh-token', null, {
      withCredentials: true,
    });

    setAccessToken(response.data.accessToken);

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
