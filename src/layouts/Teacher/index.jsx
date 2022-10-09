import Classes from 'pages/Teacher/Classes/Index';
import { useEffect } from 'react';
import api from 'utils/api';

const TeacherLayout = () => {
  useEffect(() => {
    const hello = api.get('http://localhost:4000/api/asd');
  }, []);
  return (
    <div>
      <Classes/>
    </div>
  );
};

export default TeacherLayout;
