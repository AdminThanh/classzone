import { useQuery } from '@apollo/client';
import logo from 'assets/images/logo.png';
import clsx from 'clsx';
import { useAuth } from 'contexts/AuthContext';
import { getAllUser } from 'graphql/user';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { INavItem } from 'routes/navs';
import {
  CloseIcon,
  DefaultAvatar,
  ExitIcon,
  ProfileIcon,
  SettingIcon,
  ShowmoreIocn,
} from 'utils/drawer';
import JWTManager from 'utils/jwt';
import './Navbar.scss';

interface IUserControl extends INavItem {
  onClick?: () => void;
}
export interface INavbarProps {
  navList: IUserControl[];
}

const Navbar = (props: INavbarProps) => {
  const { navList = [] } = props;
  const { isAuthenticated, logout, auth } = useAuth();
  const [isSidebar, setIsSidebar] = useState(false);
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

  const handleOpenSidebar = () => {
    setIsSidebar(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebar(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__skin">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="logo" />
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
            <div className="navbar__showmore" onClick={handleOpenSidebar}>
              <ShowmoreIocn />
            </div>

            {/* User control */}
            {isAuthenticated && (
              <div className="navbar__user">
                <div className="navbar__label">Chào, {auth?.username}</div>
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

      {/* Responsive navbar */}
      <div
        className={clsx({
          navbar__modal: true,
          'navbar__modal--active': isSidebar,
        })}
      >
        <div
          className={clsx({
            navbar__modal__skin: true,
            'navbar__modal__skin--active': isSidebar,
          })}
        >
          <div className="navbar__modal__header">
            <CloseIcon onClick={handleCloseSidebar} />
          </div>
          <div className="navbar__modal__body">
            <div className="navbar__modal__user">
              <div className="navbar__modal__avatar">
                <DefaultAvatar className="navbar__avatar" />
              </div>
              <div className="nav__modal_username">Chào, {auth?.username}</div>
            </div>
            <div className="navbar__modal__listItem">
              {navList?.map((item, idx) => (
                <div key={idx} className="navbar__modal__item ">
                  <Link to={item.path} className="navbar__modal__link">
                    <item.icon className="navbar__modal__icon" />
                    <span className="navbar__modal__label">
                      {t(`navbar.${item.label}`)}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="navbar__modal__footer">
            <div className="navbar__modal__footer__container">
              {listUserControl.map((item, idx) => (
                <div className="navbar__modal__item">
                  <Link
                    onClick={item.onClick}
                    key={idx}
                    to=""
                    className="navbar__modal__link"
                  >
                    <item.icon className="navbar__modal__icon"></item.icon>
                    <span className="navbar__control__label">
                      {t(`user_control.${item.label}`)}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
