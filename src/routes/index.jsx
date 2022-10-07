import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Import pages

/* Teacher routes */
const HomeTeacher = React.lazy(() => import('pages/Teacher/Home'));

/* Student routes */

/* Admin routes */

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              App <Outlet />
            </div>
          }
        >
          <Route index element={<HomeTeacher />} />
          {/* <Route path="teams" element={<Teams />}>
                        <Route path=":teamId" element={<Team />} />
                        <Route path="new" element={<NewTeamForm />} />
                        <Route index element={<LeagueStandings />} />
                    </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
