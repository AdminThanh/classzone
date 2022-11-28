import Navbar from 'components/Navbar';
import { TeacherRoutes } from 'routes/navs';
import "./TeacherLayout.scss";

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
