import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const JWTManager = () => {
  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;

  const getToken = () => inMemoryToken;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    // Decode and set countdown to refresh
    const decoded = jwtDecode<JwtPayload & { _id: string }>(accessToken);

    setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number));

    return true;
  };

  const deleteToken = () => {
    inMemoryToken = null;
  };

  const getRefreshToken = async () => {
    try {
      const response = await fetch('http://localhost:4000/refresh_token', {
        credentials: 'include',
      });

      const data = (await response.json()) as {
        success: boolean;
        accessToken: string;
      };

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
      getRefreshToken,
      delay * 1000 - 5000
    );
  };

  return {
    getToken,
    setToken,
    getRefreshToken,
  };
};

export default JWTManager();
