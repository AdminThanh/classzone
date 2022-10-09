import Navbar from 'components/Navbar';
import { useEffect } from 'react';
import { TeacherRoutes } from 'routes/navs';

const TeacherLayout = () => {
  return (
    <div className="teacherLayout">
      <Navbar navList={TeacherRoutes} />
    </div>
  );
};

export default TeacherLayout;
