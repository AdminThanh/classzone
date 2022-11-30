import { useQuery } from '@apollo/client';
import BreadCrumb from 'components/BreadCrumb';
import Calendars from 'components/Calendar';
import { GetClassByIdDocument } from 'gql/graphql';
import { getClassByIdForSchedule } from 'graphql/classes';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CreateAttendance = () => {
  const { t } = useTranslation();
  const { classId } = useParams();
  const { data, refetch } = useQuery(getClassByIdForSchedule, {
    variables: {
      id: classId as string,
    },
  });

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
      <Calendars
        endDate={data?.getClassById?.end_date}
        fromDate={data?.getClassById?.from_date}
      />
    </div>
  );
};

export default CreateAttendance;
