import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginUser } from '@authentication/api/useLoginUser';
import Input from '@/components/ui/form/Input';
import { IUserLogin } from '@authentication/interfaces/user-auth.interface';
import { EMAIL_REGEX } from '@/constants/register-regex';
import Button from '@/components/ui/Button';

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
            }}
          ></Input>
          <Button variant="primary" type="submit">
            Login
          </Button>
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
