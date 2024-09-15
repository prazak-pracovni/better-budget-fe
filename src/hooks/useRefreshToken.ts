import useAuth from './useAuth';
import axios from '../api/axios';

interface IRefreshTokenResponse {
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
    console.log('Requesting new access token');

    const response = await axios.post<IRefreshTokenResponse>('/api/auth/refresh-token', null, {
      withCredentials: true,
    });

    setAccessToken(response.data.accessToken);

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
