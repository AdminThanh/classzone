import { DatePicker } from 'antd';
import FilterMenu from 'components/FilterMenu';
import Navbar from 'components/Navbar';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TeacherRoutes } from 'routes/navs';

const TeacherLayout = () => {
  const handleChangeFilterMenu = (values) => {
    console.log('Change', values);
  };

  const { t } = useTranslation();

  const fields = useMemo(
    () => [
      {
        name: 'start_date',
        type: 'datepicker',
        label: t('my_class.start_date'),
        placeholder: t('my_class.choose_start_date'),
      },
      {
        name: 'end_date',
        type: 'datepicker',
        label: t('my_class.end_date'),
        placeholder: t('my_class.choose_end_date'),
      },
      {
        name: 'status',
        type: 'select',
        label: t('my_class.status'),
        placeholder: t('my_class.choose_status'),
        options: [
          {
            value: 0,
            label: t('my_class.is_activating'),
          },
          {
            value: 1,
            label: t('my_class.is_finished'),
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="teacherLayout">
      <Navbar navList={TeacherRoutes} />
      <FilterMenu
        initialValues={{
          search: '',
          start_date: '',
          end_date: '',
          status: undefined,
        }}
        fields={fields}
        onChange={handleChangeFilterMenu}
        searchPlaceholder={t('my_class.fill_in_class_name')}
        changeDelay={1000}
      />
    </div>
  );
};

export default TeacherLayout;
