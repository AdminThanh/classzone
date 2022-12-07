import './Auth.scss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const AuthLayout = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const [tabChange, setTabChange] = useState<1 | 2>(
    location.pathname === '/register' ? 1 : 2
  ); // 1: register, 2: login

  const handleChangeTab = (e: number): void => {
    if (e === 1) {
      setTabChange(1);
      navigate('/register');
    }
    if (e === 2) {
      setTabChange(2);
      navigate('/login');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-layout-container">
        <div className="auth-layout-skeleton">
          <div className="tab-wrapper">
            <div className="tab-change">
              <button
                type="button"
                className={clsx('btn-tab', { active: tabChange === 1 })}
                onClick={() => handleChangeTab(1)}
              >
                Đăng ký
              </button>
              <button
                type="button"
                className={clsx('btn-tab', { active: tabChange === 2 })}
                onClick={() => handleChangeTab(2)}
              >
                Đăng nhập
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
      <img
        className="bg-right"
        src={require('assets/images/background/right-bg.png')}
        alt=""
      />
    </div>
  );
};

export default AuthLayout;
