import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../api/useLoginUser';
import Input from '@/components/Form/Input';

interface IUserLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const methods = useForm<IUserLogin>({ mode: 'onTouched' });
  const { mutate, isError: isLoginUserError } = useLoginUser();

  const onSubmit: SubmitHandler<IUserLogin> = (userLogin) => {
    mutate(userLogin);
  };

  return (
    <>
      <div className="mb-6">
        {isLoginUserError && (
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
    </>
  );
};

export default LoginForm;
