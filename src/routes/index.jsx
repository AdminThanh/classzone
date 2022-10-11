import { RequireAuth, RequireGuest } from 'components/Auth';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';

// Import pages

/* Teacher routes */
const HomeTeacher = React.lazy(() => import('pages/Teacher/Home'));

/* Student routes */

/* Admin routes */

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => {
          let Layout = route?.layout || <></>;
          let Element = route.element;

          // Đợi API login ms xử lý case này
          if (route.role.includes('teacher')) {
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
          }
        })}
        <Route path="home" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
