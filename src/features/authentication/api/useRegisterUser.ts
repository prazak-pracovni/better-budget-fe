import { AxiosError } from 'axios';
import axios from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { IUserRegister } from '@authentication/interfaces/user-auth.interface';
import { useNavigate } from 'react-router-dom';
import useAuth from '@authentication/hooks/useAuth';

interface IRegisterError {
  message: string;
  error: string;
  statusCode: number;
}

interface IRegisterResponse {
  accessToken: string;
}

const registerUser = async (userRegister: IUserRegister): Promise<IRegisterResponse> => {
  const { data } = await axios.post(`/api/auth/register`, userRegister, { withCredentials: true });
  return data;
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (userRegister: IUserRegister) => registerUser(userRegister),
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IRegisterError;
      setErrorMessage(errorResponse.message);
    },
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      navigate('/dashboard', { replace: true });
    },
  });

  return { ...mutation, errorMessage };
};
