import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/Form/Input';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface ILoginUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const methods = useForm<ILoginUser>({ mode: 'onTouched' });

  const mutation = useMutation({
    mutationFn: (userLogin: ILoginUser) => {
      return axios.post(`/api/auth/login`, userLogin);
    },
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      navigate('/dashboard', { replace: true });
    },
  });

  const onSubmit: SubmitHandler<ILoginUser> = (userLogin) => {
    mutation.mutate(userLogin);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>
        <div className="mb-6">
          {mutation.isError && (
            <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
              <strong className="block font-medium text-red-800">Wrong email or password</strong>
              <p className="mt-2 text-sm text-red-700">Please check your email and password and try again.</p>
            </div>
          )}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              validation={{
                required: { value: true, message: 'Email is required' },
              }}
            ></Input>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              validation={{
                required: { value: true, message: 'Password is required' },
              }}
            ></Input>
            <button
              type="submit"
              className="w-full inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Don't have an account yet?
              <Link to={'/register'} className="ml-1 text-gray-700 underline">
                Register now
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
