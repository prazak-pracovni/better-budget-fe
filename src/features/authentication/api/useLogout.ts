import axios from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import useAuth from '@authentication/hooks/useAuth';

const logoutUser = async () => {
  const { data } = await axios.post('api/auth/logout', null, {
    withCredentials: true,
  });

  return data;
};

const useLogout = () => {
  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => setAccessToken(''),
  });

  return mutation;
};

export default useLogout;
