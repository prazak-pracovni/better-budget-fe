import RegisterForm from '@/features/authentication/components/RegisterFrom';

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
