import { Spin } from 'antd';
import { RequireAuth, RequireGuest } from 'components/Auth';
import { useAuth } from 'contexts/AuthContext';
import AuthLayout from 'layouts/Auth';
import ErrorPage from 'pages/404Page';
import Login from 'pages/Login';
import Register from 'pages/Register';
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

// Import pages

/* Teacher routes */
// const HomeTeacher = React.lazy(() => import('pages/Teacher/Home'));

/* Student routes */

/* Admin routes */

const Router = () => {
  const { checkAuth, loading, isAuthenticated, auth } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };

    authenticate();
  }, []);

  useEffect(() => {
    if (loading === false && isAuthenticated === null) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  return (
    <Spin spinning={loading}>
      <BrowserRouter>
        <Routes>
          {loading === false && (
            <>
              {isAuthenticated && (
                <>
                  {routes.map((route, idx) => {
                    let Layout = route?.layout || React.Fragment;
                    let Element = route.element;

                    const role = auth?.role;

                    if (route?.role?.includes(role?.toLowerCase())) {
                      return (
                        <Route
                          key={idx}
                          path={route.path}
                          element={
                            <>
                              <RequireAuth>
                                {route?.role?.length && (
                                  <Layout>
                                    <Element />
                                  </Layout>
                                )}
                              </RequireAuth>
                            </>
                          }
                        />
                      );
                    }
                  })}
                  <Route path="*" element={<Navigate to="/not-found" />} />;
                </>
              )}
              <Route
                path="login"
                element={
                  <>
                    <RequireGuest>
                      <AuthLayout>
                        <Login />
                      </AuthLayout>
                    </RequireGuest>
                  </>
                }
              />
              <Route path="/" element={<Navigate to="login" />} />
              <Route
                path="register"
                element={
                  <>
                    <RequireGuest>
                      <AuthLayout>
                        <Register />
                      </AuthLayout>
                    </RequireGuest>
                  </>
                }
              />
              <Route path="not-found" element={<ErrorPage />} />
              <Route path="*" element={<Navigate to="/not-found" />} />;
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Spin>
  );
};

export default Router;
