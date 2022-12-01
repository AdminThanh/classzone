import Navbar from 'components/Navbar';
import { useAuth } from 'contexts/AuthContext';
import { StudentRoutes, TeacherRoutes } from 'routes/navs';
import './TeacherLayout.scss';

const TeacherLayout = (props: any) => {
  const { children } = props;
  const { auth } = useAuth();
  console.log();
  const Routes = auth.role === 'STUDENT' ? StudentRoutes : TeacherRoutes;

  return (
    <div className="teacherLayout">
      <Navbar navList={Routes} />
      <div className="teacherLayout__container">{children}</div>
    </div>
  );
};

export default TeacherLayout;
