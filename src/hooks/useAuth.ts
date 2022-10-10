import { createContext, useEffect, useState } from 'react';

const authContext = createContext(undefined);

const useAuth = () => {
  const [auth, setAuth] = useState<any>(undefined);

  return {
    auth,
    login() {
      return new Promise((res) => {
        setAuth(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuth(false);
        res();
      });
    },
  };
};

export default useAuth;
