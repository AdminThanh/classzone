import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import FilterMenu, { TField } from 'components/FilterMenu';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GetAllUserDocument } from 'gql/graphql';
import FilterTags, { IOptionTag } from 'components/FilterTags';

const Home = () => {
  const state = useSelector((state: RootState) => state.counter.second);
  const { data, loading } = useQuery(GetAllUserDocument);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const fields: TField[] = useMemo(
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
    [i18next.language]
  );

  const tagOpts: IOptionTag[] = useMemo(
    () => [
      {
        label: 'Tiếng Anh',
        value: '1',
      },
      {
        label: 'Tiếng Đức',
        value: '2',
      },
    ],
    []
  );

  const handleChangeFilterMenu = (values: any) => {
    console.log('Change', values);
  };

  const handleChangeFilterTags = (value: string[]) => {
    console.log('Change', value);
  };

  return (
    <div>
      Home Teacher: {state} - {i18next.language}
      <div>
        <button
          onClick={() => {
            i18next.changeLanguage(i18next.language === 'vi' ? 'en' : 'vi');
          }}
        >
          {t('count.change_language')}
        </button>
      </div>
      <BreadCrumb
        routes={[
          {
            name: t('breadCrumb.classList'),
            path: '/classes',
          },
        ]}
      />
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
      <FilterTags
        isShowTagControl
        opts={tagOpts}
        onChange={handleChangeFilterTags}
      />
    </div>
  );
};

export default Home;
