import { createContext, ReactNode, useState } from 'react';

interface IAuthProvider {
  children?: ReactNode;
}

interface IAuthContext {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [accessToken, setAccessToken] = useState<string>('');

  return <AuthContext.Provider value={{ accessToken, setAccessToken }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
