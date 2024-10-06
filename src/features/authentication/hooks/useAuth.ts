import { useContext } from 'react';
import AuthContext from '@/features/authentication/utils/context/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
