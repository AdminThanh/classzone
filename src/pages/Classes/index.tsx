import { PlusCircleOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Row, Select, Skeleton } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import BreadCrumb from 'components/BreadCrumb';
import FilterMenu, { TField } from 'components/FilterMenu';
import { useAuth } from 'contexts/AuthContext';
import { GetMyClassDocument, GetMyClassStudentDocument } from 'gql/graphql';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Classes.scss';
import ClassItem from './components/ClassItem';
import EditClass from './components/EditClass';

export interface IClassInfo {
  id: string;
  name: string;
  avatar: string;
  end_date: string;
  from_date: string;
  code: string;
  scoreFactor: number;
  owner: any;
}

const { Option } = Select;

const Classes = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { data, refetch, loading }: any = useQuery(
    auth?.role === 'STUDENT' ? GetMyClassStudentDocument : GetMyClassDocument,
    {
      variables: {
        fitlerClassType: {
          // name: '',
          // sortType: 'FROM_DATE',
          // status: "AVAILABLE"
        },
      },
    }
  );

  const datas = (data?.getMyClass || data?.getMyClassStudent) as IClassInfo[];

  const [fireGetMyClass] = useLazyQuery(GetMyClassDocument);

  const handleRefetch = () => {
    refetch();
  };

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
    try {
      fireGetMyClass({
        variables: {
          fitlerClassType: {
            // status: values.status === 0 ? 'AVAILABLE' : 'END' as string,
            from_date: values.start_date,
            end_date: values.end_date
          }
        }
      })
      handleRefetch();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <BreadCrumb
          routes={[
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
            {auth.role === 'TEACHER' && (
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
            )}

            {openModal && (
              <EditClass
                handleRefetch={handleRefetch}
                type={'add'}
                title={t('my_class.add_class')}
                setOpenModal={setOpenModal}
              />
            )}
          </div>
        </div>

        <div className="classes">
          {!loading ? (
            <Row gutter={[20, 20]}>
              {datas?.length !== 0 &&
                datas?.map((item) => (
                  <Col
                    key={item.id}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={8}
                  >
                    <ClassItem
                      id={item.id}
                      name={item.name}
                      avatar={item.avatar}
                      end_date={item.end_date}
                      from_date={item.from_date}
                      code={item.code}
                      owner={
                        auth.role === 'STUDENT' &&
                        item.owner?.firstName + item.owner?.lastName
                      }
                      scoreFactor={item.scoreFactor}
                      handleRefetch={handleRefetch}
                    />
                  </Col>
                ))}
            </Row>
          ) : (
            <Row className="loading-list">
              {[1, 2, 3].map(() => (
                <div className="loading-item">
                  <Skeleton.Node active />
                </div>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};
export default Classes;
