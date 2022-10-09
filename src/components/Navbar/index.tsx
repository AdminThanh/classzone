import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { INavItem } from 'routes/navs';
import {
  ClassIcon,
  DefaultAvatar,
  ExitIcon,
  ProfileIcon,
  SettingIcon,
} from 'utils/drawer';
import './Navbar.scss';

export interface INavbarProps {
  navList: INavItem[];
}

const Navbar = (props: INavbarProps) => {
  const { navList = [] } = props;

  const listUserControl: INavItem[] = useMemo(() => {
    return [
      {
        label: 'account_management',
        icon: ProfileIcon,
        path: '',
      },
      {
        label: 'setting',
        icon: SettingIcon,
        path: '',
      },
      {
        label: 'quit',
        icon: ExitIcon,
        path: '',
      },
    ];
  }, []);

  const { t } = useTranslation();
  return (
    <div className="navbar">
      <div className="navbar__skeleton">
        <div className="navbar__logo"></div>
        <ul className="navbar__listItem">
          {navList?.map((item, idx) => (
            <li key={idx} className="navbar__item">
              <Link to="#" className="navbar__link">
                <item.icon className="navbar__icon" />
                <span className="navbar__label">
                  {t(`navbar.${item.label}`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar__user">
          <div className="navbar__label">Chào, Hồ Thị Bích Ngọc</div>
          <DefaultAvatar className="navbar__avatar" />

          {/* dropdown */}
          <div className="navbar__dropdown">
            <div className="navbar__listControl">
              {listUserControl.map((item, idx) => (
                <Link key={idx} to="" className="navbar__controlItem">
                  <item.icon className="navbar__control-icon"></item.icon>
                  <span className="navbar__control-label">
                    {t(`user_control.${item.label}`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
