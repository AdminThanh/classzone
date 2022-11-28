import BreadCrumb from 'components/BreadCrumb';
import Calendars from 'components/Calendar';
import { useTranslation } from 'react-i18next';

const CreateAttendance = () => {
  const { t } = useTranslation();
  return (
    <div>
      <BreadCrumb
        routes={[
          {
            name: t('navbar.home'),
            path: '/',
          },
          {
            name: t('navbar.class_management'),
            path: '/',
          },
        ]}
      />
      <Calendars />
    </div>
  );
};

export default CreateAttendance;
