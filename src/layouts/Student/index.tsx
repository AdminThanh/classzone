import Navbar from 'components/Navbar';
import { useTranslation } from 'react-i18next';

const StudentLayout = (props: any) => {
  const { children } = props;
  const { t } = useTranslation();
  return (
    <div className="studentLayout">
      <div className="studentLayout__container">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;
