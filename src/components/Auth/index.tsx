import useAuth from 'hooks/useAuth';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IGuard {
  children: ReactElement<any>;
}

export const RequireAuth = (props: IGuard) => {
  const { children } = props;
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth]);

  return <div>{children}</div>;
};

export const RequireGuest = (props: IGuard) => {
  const { children } = props;
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  return <div>{children}</div>;
};