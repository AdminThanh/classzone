import './GroupList.scss';
import {
  UserOutlined,
  AntDesignOutlined,
  PlusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import {
  Avatar,
  Button,
  Col,
  Form,
  InputNumber,
  Modal,
  notification,
  Row,
  Tooltip,
} from 'antd';
import { useTranslation } from 'react-i18next';
import CreateGroup from './components/CreateGroup';
import { useMutation, useQuery } from '@apollo/client';
import { CreateAutoGroupDocument, GetGroupOfClassDocument } from 'gql/graphql';
import { useParams } from 'react-router-dom';
import ButtonGroup from 'antd/lib/button/button-group';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import GroupDetail from '../GroupDetail';
interface IStudentInfo {
  id: string;
  name: string;
  avatar: string;
}
interface IGroupInfo {
  id: string;
  name: string;
  members: IStudentInfo[];
}

const GroupList = (props: any) => {
  const { dataGroup, dataListStudent } = props;
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [choseType, setChoseType] = useState(false);
  const [choseNumber, setChoseNumber] = useState(false);
  const [groupDetailInfo, setGroupDetailInfo] = useState({});
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const { t } = useTranslation();
  let { classId } = useParams();
  const [form] = useForm();

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      handleCreateGroupAuto();
    }, 2000);
  };

  const [fireCreateAutoGroup] = useMutation(CreateAutoGroupDocument);

  const { data: groupOfClass, refetch } = useQuery(GetGroupOfClassDocument, {
    variables: {
      classId: classId as string,
    },
  });

  const datas = groupOfClass?.getGroupOfClass.map((item) => ({
    id: item.id,
    name: item.name as string,
    members: item.students.map((student) => ({
      avatar: student.avatar as string,
      name: student.firstName + ' ' + student.lastName,
      id: student.id,
    })),
  }));

  const handleRefetchGoup = () => {
    refetch();
  };

  const handleCreateGroupAuto = async () => {
    console.log(form.getFieldValue('numberGroup'));
    try {
      await fireCreateAutoGroup({
        variables: {
          classId: classId as string,
          groupAmount: form.getFieldValue('numberGroup'),
        },
      });
      setChoseNumber(false);
      notification.success({
        key: 'success',
        message: t('action.create_success'),
      });
      handleRefetchGoup();
    } catch (error) {
      notification.error({
        key: 'error',
        message: t('action.create_error'),
      });
    }
  };

  return (
    <Row gutter={[20, 20]}>
      {datas?.length !== 0 &&
        datas?.map((item: IGroupInfo) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <div className="groups_list-item">
              <h1 className="name">{item.name ? item.name : 'Chưa có tên'}</h1>
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {item.members?.length !== 0 &&
                  item.members?.map((student: IStudentInfo) =>
                    student.avatar ? (
                      <Avatar key={student.id} src={student.avatar} />
                    ) : (
                      <Avatar style={{ backgroundColor: '#f56a00' }}>
                        {student.name.charAt(0).toUpperCase()}
                      </Avatar>
                    )
                  )}
              </Avatar.Group>
              <Button
                onClick={() => {
                  setShowCreateGroup(true);
                  setGroupDetailInfo(item);
                }}
                type="primary"
                className="ouline"
                size={'large'}
              >
                {t('action.view_detail')}
              </Button>
            </div>
          </Col>
        ))}

      <Col
        onClick={() => {
          // setShowCreateGroup(true);
          setGroupDetailInfo('');
          setChoseType(true);
        }}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        xxl={4}
      >
        <div className="groups_list-item add">
          <PlusCircleOutlined />
        </div>
      </Col>
      {showCreateGroup && (
        <CreateGroup
          groupDetailInfo={groupDetailInfo}
          classId={classId}
          handleRefetchGoup={handleRefetchGoup}
          dataListStudent={dataListStudent}
          setShowCreateGroup={setShowCreateGroup}
        />
      )}
      <Modal
        className="chose_createGroup"
        title={'Tạo nhóm'}
        footer={false}
        open={choseType}
        onCancel={() => setChoseType(false)}
      >
        <Button
          type="primary"
          className="primary"
          onClick={() => {
            setChoseType(false);
            setShowCreateGroup(true);
          }}
        >
          Tùy chọn
        </Button>
        <Button
          onClick={() => {
            setChoseType(false);
            setChoseNumber(true);
          }}
          type="primary"
          className="primary"
        >
          Tạo tự động
        </Button>
      </Modal>

      <Modal
        className="create_group_auto"
        title={'Tạo nhóm'}
        footer={false}
        open={choseNumber}
        onCancel={() => setChoseNumber(false)}
      >
        <Form form={form} initialValues={{ numberGroup: 1 }}>
          <FormItem name={'numberGroup'}>
            <InputNumber min={1} />
          </FormItem>
        </Form>

        <Button
          type="primary"
          className="primary"
          icon={<PlusCircleOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Tạo ngay
        </Button>
      </Modal>
    </Row>
  );
};
export default GroupList;
