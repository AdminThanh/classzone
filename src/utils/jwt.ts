import { useApolloClient } from '@apollo/client';
import { RefreshTokenDocument, TokenAndUser, User } from 'gql/graphql';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import client from './apollo';

const JWTManager = () => {
  const LOGOUT_EVENT_NAME = 'jwt-logout';

  // In cookie key refresh_token
  let inMemoryToken: string | null = null;

  let refreshTokenTimeoutId: number | null = null;

  // In localStorage key have_refresh_token
  let inMemoryIsRefreshToken: boolean | null = false;

  let userInfo: User | null = null;

  try {
    inMemoryIsRefreshToken = Boolean(
      +(localStorage.getItem('have_refresh_token') || 0)
    );
  } catch (err) {
    inMemoryIsRefreshToken = false;
  }

  const getToken = () => inMemoryToken;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    // Decode and set countdown to refresh
    const decoded = jwtDecode<JwtPayload & { _id: string }>(accessToken);

    setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number));

    return true;
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();

    window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
    return true;
  };

  /* Handle isRefreshToken */
  const getIsRefreshToken = () => inMemoryIsRefreshToken;

  const setIsHaveRefreshToken = (isHaveRefreshToken: boolean) => {
    inMemoryIsRefreshToken = isHaveRefreshToken;
    localStorage.setItem(
      'have_refresh_token',
      (+isHaveRefreshToken).toString()
    );
  };

  /* Handle user */
  const getAuthInfo = () => userInfo;

  const setAuthInfo = (user: User) => {
    userInfo = user;
  };

  // To logout all tabs (nullify inmemoryToken)
  window.addEventListener('storage', (event) => {
    if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
  });

  const refreshToken = async () => {
    try {
      const response = await client.query({
        query: RefreshTokenDocument,
      });

      const data: any = response.data.refreshToken;

      setAuthInfo(data.user);
      setToken(data.accessToken);
      return true;
    } catch (err) {
      console.log('UNAUTHENTICATED', err);
      deleteToken();
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    // 5s before token expires
    refreshTokenTimeoutId = window.setTimeout(
      refreshToken,
      delay * 1000 - 5000
    );
  };

  return {
    getToken,
    setToken,
    refreshToken,
    deleteToken,
    getIsRefreshToken,
    setIsHaveRefreshToken,
    getAuthInfo,
    setAuthInfo,
  };
};

export default JWTManager();
