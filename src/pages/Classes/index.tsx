import { PlusCircleOutlined } from '@ant-design/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { canUseLayoutEffect } from '@apollo/client/utilities';
import { Button, Col, Form, Row, Select } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import FilterMenu, { TField } from 'components/FilterMenu';
import { GetMyClassDocument } from 'gql/graphql';
import i18next from 'i18next';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Classes.scss';
import ClassItem from './components/ClassItem';
import EditClass from './components/EditClass';

export interface IClassInfo {
  _id: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  scoreFactor: number;
}

const { Option } = Select;

const Classes = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const { data, loading, refetch } = useQuery(GetMyClassDocument);
  console.log(data?.getMyClass);

  const datas: IClassInfo[] = data?.getMyClass as IClassInfo[];

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

  const handleChangeFilterMenu = (values: any) => {
    console.log('Change', values);
  };
  return (
    <div className="site_wrapper">
      <div className="site_container">
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

        <div className="taskbars">
          <div className="fillter">
            <Form.Item
              label={t('my_class.filter')}
              className="tag_item"
              name="tag_ids"
            >
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
            </Form.Item>
          </div>
          <div className="addclass">
            <Button
              type="primary"
              className="primary"
              icon={<PlusCircleOutlined />}
              size={'large'}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {t('my_class.add_class')}
            </Button>
            {openModal ? (
              <EditClass
                title={t('my_class.add_class')}
                setOpenModal={setOpenModal}
              />
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="classes">
          <Row gutter={[20, 20]}>
            {datas?.length !== 0 &&
              datas?.map((item) => (
                <Col
                  key={item._id}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                  xxl={8}
                >
                  <ClassItem
                    _id={item._id}
                    name={item.name}
                    avatar={item.avatar}
                    learn_date={item.createdAt}
                    learn_date_end={item.updatedAt}
                    code={item.code}
                    scoreFactor={item.scoreFactor}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Classes;
