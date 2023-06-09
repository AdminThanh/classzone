import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { authLoginSuccess, authLogoutSuccess } from 'redux/reducers/authSlice';
import { store } from 'redux/store';
import { getUserInfoCurrent, refreshTokenServices } from 'services/auth';
// import { authLoginSuccess, authLogout, authLogoutSuccess } from 'redux/actions/auth';

const api = axios.create();
export interface IInfoJWT {
  exp: number;
  iat: number;
  role: number;
  username: string;
  _id: string;
}

api.interceptors.request.use(
  async (request: any): Promise<any> => {
    const auth: any = store.getState().auth;

    const decodedToken: IInfoJWT = jwt_decode(auth?.user.accessToken);

    request.headers['token'] = 'Bearer ' + auth.user.accessToken;
    if (decodedToken.exp < Date.now() / 1000) {
      // console.log("hết hạn token")
      try {
        // console.log("refresh Token")
        const res: any = await refreshTokenServices();

        const refreshUser = {
          ...auth.user,
          accessToken: res.data.accessToken,
        };

        store.dispatch(authLoginSuccess(refreshUser));
        // Nếu như refresh sẽ bỏ token mới vào request
        request.headers['token'] = 'Bearer ' + res.data.accessToken;
      } catch (err) {
        // Catch case user remove refreshToken in browser
        // Catch case can't take new accessToken
        console.error(err);

        // Logout account when refreshToken and accessToken invalid
        store.dispatch(authLogoutSuccess());
        // store.dispatch(authLogoutSuccess());
        return Promise.reject(err);
      }
    }

    request.headers['token'] = 'Bearer ' + auth.user.accessToken;

    return request;
  },
  (err) => {
    console.log('Lỗi');
    return Promise.reject(err);
  }
);

export default api;
