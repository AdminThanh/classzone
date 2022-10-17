import { FetchResult, useLazyQuery, useMutation } from '@apollo/client';
import { notification } from 'antd';
import {
  LoginDocument,
  LoginMutation,
  LogoutDocument,
  MeDocument,
  User,
} from 'gql/graphql';
import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import JWTManager from 'utils/jwt';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginForm } from 'components/Login';
import React from 'react';

interface IAuthContext {
  isAuthenticated: boolean | null;
  auth: any;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  login: (param: ILoginForm) => Promise<FetchResult<LoginMutation>>;
}

const defaultIsAuthenticated = null;

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  auth: {},
  setIsAuthenticated: () => {},
  checkAuth: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  login: () =>
    Promise.resolve({
      data: { login: { code: 401, success: false } },
    }),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    defaultIsAuthenticated
  );
  const [fireLogoutServer] = useMutation(LogoutDocument);
  const [fireLogin] = useMutation(LoginDocument);
  const [fireGetMe] = useLazyQuery(MeDocument);
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
    } else {
    }
    return () => {};
  }, [auth, isAuthenticated]);

  const checkAuth = useCallback(async () => {
    const token = JWTManager.getToken();

    setIsAuthenticated(false);
    if (!token && JWTManager.getIsRefreshToken()) {
      const success = await JWTManager.refreshToken();
      if (success) {
        setIsAuthenticated(true);
        setAuth(JWTManager.getAuthInfo());
      } else {
        setAuth({});
      }
    }
  }, []);

  const logoutClient = () => {
    JWTManager.deleteToken();
    setIsAuthenticated(false);
  };

  const login = async ({ email, password }: ILoginForm) => {
    const res: FetchResult<LoginMutation> = await fireLogin({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });

    setAuth(res.data?.login.user as User);
    JWTManager.setAuthInfo(res.data?.login.user as User);

    return res;
  };

  const logout = async () => {
    const res = await fireLogoutServer();

    if (res?.data?.logout.success) {
      JWTManager.setIsHaveRefreshToken(false);
      logoutClient();

      notification.success({
        message: t('auth.logout_success'),
      });

      setAuth({});
      window.location.href = '/login';
    } else {
      notification.error({
        message: t('auth.logout_error'),
      });
    }
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    login,
    logout,
    auth,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthContextProvider);
