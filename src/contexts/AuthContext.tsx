import { FetchResult, useLazyQuery, useMutation } from '@apollo/client';
import { notification, Spin } from 'antd';
// import {
//   LoginDocument,
//   LoginMutation,
//   LogoutDocument,
//   MeDocument,
//   User,
// } from 'gql/graphql';
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
import { ILoginForm } from 'pages/Login';
import React from 'react';
import {
  LoginDocument,
  LoginMutation,
  LogoutDocument,
  User,
} from 'gql/graphql';

interface IAuthContext {
  isAuthenticated: boolean | null;
  auth: any;
  loading: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  //   login: (param: ILoginForm) => Promise<FetchResult<LoginMutation>>;
  login: (param: ILoginForm) => Promise<any>;
}

const defaultIsAuthenticated = false;

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  auth: {},
  loading: true,
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultIsAuthenticated
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [fireLogoutServer] = useMutation(LogoutDocument);
  const [fireLogin] = useMutation(LoginDocument);
  //   const [fireGetMe] = useLazyQuery(MeDocument);
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
        setLoading(false);
      } else {
        setAuth({});
        setLoading(false);
      }
    } else {
      setLoading(false);
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
    notification.open({
      message: (
        <span>
          <Spin /> Đang đăng xuất.....
        </span>
      ),
    });
    try {
      const res = await fireLogoutServer();

      notification.destroy();

      JWTManager.setIsHaveRefreshToken(false);
      logoutClient();

      notification.success({
        message: t('auth.logout_success'),
      });

      setAuth({});
      window.location.href = '/login';
    } catch (err) {
      notification.error({
        message: t('auth.logout_error'),
      });
    }
  };

  const authContextData: any = {
    isAuthenticated,
    loading,
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
