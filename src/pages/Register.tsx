import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../constants/register-regex';
import Input from '../components/Form/Input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

interface IRegisterError {
  message: string;
  error: string;
  statusCode: number;
}

const Register: React.FC = () => {
  const methods = useForm<IRegisterUser>({ mode: 'onTouched' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (userRegister: IRegisterUser) => {
      return axios.post(`/api/auth/register`, userRegister);
    },
    onSuccess: (data) => {
      console.log('Data', data);
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IRegisterError;
      setErrorMessage(errorResponse.message);
    },
  });

  const onSubmit: SubmitHandler<IRegisterUser> = (userRegister) => {
    mutation.mutate(userRegister);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Register</h1>
        <div className="mb-6">
          {errorMessage && (
            <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              validation={{
                required: { value: true, message: 'Username is required' },
                pattern: {
                  value: USERNAME_REGEX,
                  message: 'Username must be 6-16 characters long and alphanumeric',
                },
              }}
            ></Input>
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              validation={{
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Email must be a valid email address',
                },
              }}
            ></Input>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              validation={{
                required: { value: true, message: 'Password is required' },
                pattern: {
                  value: PASSWORD_REGEX,
                  message: 'Password must be 8-16 characters long, alphanumeric.',
                },
              }}
            ></Input>

            <button
              type="submit"
              className="w-full inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Register
            </button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to={'/login'} className="ml-1 text-gray-700 underline">
                Log in
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
