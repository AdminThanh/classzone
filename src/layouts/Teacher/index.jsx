import AuthPage from 'pages/AuthPage/AuthPage';
import { useEffect } from 'react';
// import api from 'utils/api';

const TeacherLayout = () => {
  useEffect(() => {
    // const hello = api.get('http://localhost:4000/api/asd');
  }, []);
  return (
    <div>
      {/* TeacherLayouts */}
      <AuthPage />
    </div>
  );
};

export default TeacherLayout;
