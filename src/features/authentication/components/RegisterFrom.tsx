import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegisterUser } from '@authentication/api/useRegisterUser';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/constants/register-regex';
import Input from '@/components/ui/form/Input';
import { IUserRegister } from '@authentication/interfaces/user-auth.interface';
import Button from '@/components/ui/Button';

const RegisterForm = () => {
  const methods = useForm<IUserRegister>({ mode: 'onTouched' });
  const { mutate, errorMessage } = useRegisterUser();

  const onSubmit: SubmitHandler<IUserRegister> = (userRegister) => {
    mutate(userRegister);
  };

  return (
    <>
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
          <Button variant="primary" type="submit">
            Register
          </Button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <Link to={'/login'} className="ml-1 text-gray-700 underline">
              Log in
            </Link>
          </p>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
