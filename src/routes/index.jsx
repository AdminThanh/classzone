import { Spin } from 'antd';
import { RequireAuth, RequireGuest } from 'components/Auth';
import { useAuth } from 'contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { routes } from './routes';

// Import pages

/* Teacher routes */
// const HomeTeacher = React.lazy(() => import('pages/Teacher/Home'));

/* Student routes */

/* Admin routes */

const Router = () => {
  const { checkAuth, loading, isAuthenticated } = useAuth();
  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };

    authenticate();
  }, []);

  useEffect(() => {
    console.log(loading, isAuthenticated);
    if (loading === false && isAuthenticated === null) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  return (
    <Spin spinning={loading}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, idx) => {
            let Layout = route?.layout || React.Fragment;
            let Element = route.element;

            // Đợi API login ms xử lý case này
            // if (route.role.includes('teacher')) {
            // if (route.role.includes('student')) {
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <>
                    {route?.role?.length && (
                      <RequireAuth>
                        <Layout>
                          <Element />
                        </Layout>
                      </RequireAuth>
                    )}
                    {!route?.role?.length && (
                      <RequireGuest>
                        <Layout>
                          <Element />
                        </Layout>
                      </RequireGuest>
                    )}
                  </>
                }
              />
            );
            // }
          })}
          <Route path="home" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </Spin>
  );
};

export default Router;
