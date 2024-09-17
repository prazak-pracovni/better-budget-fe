import LoginForm from '@authentication/components/LoginForm';

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
