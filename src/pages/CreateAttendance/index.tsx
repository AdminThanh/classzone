import { useQuery } from '@apollo/client';
import BreadCrumb from 'components/BreadCrumb';
import Calendars from 'components/Calendar';
import { GetClassByIdForScheduleDocument } from 'gql/graphql';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CreateAttendance = () => {
  const { t } = useTranslation();
  const { classId } = useParams();
  const { data, refetch } = useQuery(GetClassByIdForScheduleDocument, {
    variables: {
      id: classId as string,
    },
  });

  return (
    <div>
      <BreadCrumb
        routes={[
          {
            name: data?.getClassById.name as string,
            path: `/class_detail/${classId}`,
          },
          {
            name: t('navbar.attendance'),
            path: '#',
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
