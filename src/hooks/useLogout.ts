import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAccessToken } = useAuth();

  const logout = async () => {
    try {
      await axios
        .post('api/auth/logout', null, {
          withCredentials: true,
        })
        .then(() => setAccessToken(''));
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
