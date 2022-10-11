import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { TeacherRoutes } from 'routes/navs';
import React from 'react';

const TeacherLayout = (props: any) => {
  const { children } = props;
  console.log();

  return (
    <div className="teacherLayout">
      <Navbar navList={TeacherRoutes} />
      <div className="teacherLayout__container">
        {children}
      </div>
    </div>
  );
};

export default TeacherLayout;
