import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '@authentication/hooks/useAuth';
import { IUserLogin } from '@authentication/interfaces/user-auth.interface';

interface ILoginResponse {
  accessToken: string;
}

const loginUser = async (userLogin: IUserLogin): Promise<ILoginResponse> => {
  const { data } = await axios.post(`/api/auth/login`, userLogin, { withCredentials: true });
  return data;
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (userLogin: IUserLogin) => loginUser(userLogin),
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      navigate('/dashboard', { replace: true });
    },
  });

  return mutation;
};
