import { useQuery } from '@apollo/client';
import BreadCrumb from 'components/BreadCrumb';
import Calendars from 'components/Calendar';
import { GetClassByIdDocument } from 'gql/graphql';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CreateAttendance = () => {
  const { t } = useTranslation();
  const { classId } = useParams();
  const { data, refetch } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId as string,
    },
  });
  console.log('data', data);
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
