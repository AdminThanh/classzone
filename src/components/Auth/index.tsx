import { useAuth } from 'contexts/AuthContext';
import { ReactElement, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IGuard {
  children: ReactElement<any>;
}

export const RequireAuth = (props: IGuard) => {
  const { children } = props;
  const { isAuthenticated, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false && isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <div>{isAuthenticated && children}</div>;
};

export const RequireGuest = (props: IGuard) => {
  const { children } = props;
  const { isAuthenticated, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return <div>{!isAuthenticated && children}</div>;
};
