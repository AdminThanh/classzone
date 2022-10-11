import { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const [auth, setAuth] = useState<any>(undefined);

  return {
    auth,
    login() {
      return new Promise<any>((res) => {
        setAuth(true);
        res(1);
      });
    },
    logout() {
      return new Promise<any>((res) => {
        setAuth(false);
        res(1);
      });
    },
  };
};

export function AuthProvider({ children }: any) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}
