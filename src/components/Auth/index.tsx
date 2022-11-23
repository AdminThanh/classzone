import { useAuth } from 'contexts/AuthContext';
import { ReactElement, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IGuard {
  children: ReactElement<any>;
}

export const RequireAuth = (props: IGuard) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) {
      // return;
    } else {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated]);

  return <div>{isAuthenticated && children}</div>;
};

export const RequireGuest = (props: IGuard) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated', isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) {
    } else {
      if (isAuthenticated) {
        navigate('/');
      }
    }
  }, [isAuthenticated]);

  return <div>{!isAuthenticated && children}</div>;
};
