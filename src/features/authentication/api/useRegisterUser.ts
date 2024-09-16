import { AxiosError } from 'axios';
import axios from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

interface IRegisterError {
  message: string;
  error: string;
  statusCode: number;
}

const registerUser = async (userRegister: IUserRegister) => {
  const { data } = await axios.post(`/api/auth/register`, userRegister);
  return data;
};

export const useRegisterUser = () => {
   const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (userRegister: IUserRegister) => registerUser(userRegister),
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IRegisterError;
      setErrorMessage(errorResponse.message);
    },
  });

  return { ...mutation, errorMessage };
};
