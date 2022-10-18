import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { INavItem } from 'routes/navs';
import {
  DefaultAvatar,
  ExitIcon,
  ProfileIcon,
  SettingIcon,
} from 'utils/drawer';
import logo from 'assets/images/logo.png';
import './Navbar.scss';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { LogoutDocument } from 'gql/graphql';
import JWTManager from 'utils/jwt';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'contexts/AuthContext';
import { getAllUser } from 'graphql/user';

interface IUserControl extends INavItem {
  onClick?: () => void;
}
export interface INavbarProps {
  navList: IUserControl[];
}

const Navbar = (props: INavbarProps) => {
  const { navList = [] } = props;
  const { isAuthenticated, logout } = useAuth();
  const { refetch } = useQuery(getAllUser);
  const { t } = useTranslation();

  const listUserControl: IUserControl[] = useMemo(() => {
    return [
      {
        label: 'account_management',
        icon: ProfileIcon,
        path: '',
        onClick: () => {
          refetch();
        },
      },
      {
        label: 'setting',
        icon: SettingIcon,
        path: '',
        onClick: () => {
          // console.log({
          //   token: JWTManager.getToken(),
          //   jwt: JWTManager.getIsRefreshToken()
          // });
          console.log('A', JWTManager.getAuthInfo());
        },
      },
      {
        label: 'logout',
        icon: ExitIcon,
        path: '',
        onClick: () => {
          logout();
        },
      },
    ];
  }, []);

  return (
    <div className="navbar">
      <div className="navbar__skin">
        <Link to="/" className="navbar__logo">
          <img src={logo} />
        </Link>
        <div className="navbar__skeleton">
          <ul className="navbar__listItem">
            {navList?.map((item, idx) => (
              <li key={idx} className="navbar__item">
                <Link to={item.path} className="navbar__link">
                  <item.icon className="navbar__icon" />
                  <span className="navbar__label">
                    {t(`navbar.${item.label}`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User control */}
          {isAuthenticated && (
            <div className="navbar__user">
              <div className="navbar__label">Chào, Hồ Thị Bích Ngọc</div>
              <DefaultAvatar className="navbar__avatar" />

              {/* dropdown */}
              <div className="navbar__dropdown">
                <div className="navbar__listControl">
                  {listUserControl.map((item, idx) => (
                    <Link
                      onClick={item.onClick}
                      key={idx}
                      to=""
                      className="navbar__controlItem"
                    >
                      <item.icon className="navbar__control-icon"></item.icon>
                      <span className="navbar__control-label">
                        {t(`user_control.${item.label}`)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
