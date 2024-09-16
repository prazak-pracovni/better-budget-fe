import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface IUserLogin {
  email: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
}

const loginUser = async (userLogin: IUserLogin) => {
  const { data } = await axios.post(`/api/auth/login`, userLogin);
  return data;
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  return useMutation({
    mutationFn: (userLogin: IUserLogin) => loginUser(userLogin),
    onSuccess: ({ accessToken }: ILoginResponse) => {
      setAccessToken(accessToken);
      navigate('/dashboard', { replace: true });
    },
  });
};
