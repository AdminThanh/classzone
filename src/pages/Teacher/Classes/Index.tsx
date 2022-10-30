import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select } from 'antd';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Classes.scss';
import ClassItem from './components/ClassItem';
import EditClass from './components/EditClass';

export interface IClassInfo {
  name: string;
  image: string;
  learn_date: string;
  learn_date_end: string;
  qr_code: string;
  teacher: string;
  scoreFactor: number;
}

const data: IClassInfo[] = [
  {
    name: 'Khóa học lập trình NodeJS',
    image:
      'https://gradepowerlearning.com/wp-content/uploads/2018/11/students-in-class-860x420.jpeg',
    learn_date: '11/06/2022',
    learn_date_end: '29/06/2022',
    qr_code: 'GER-I',
    teacher: 'Nguyễn Thu Hương',
    scoreFactor: 10,
  },
  {
    name: 'Khóa học lập trình PHP',
    image:
      'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/02/20/959189-bihar-board.jpg',
    learn_date: '11/10/2022',
    learn_date_end: '29/12/2022',
    qr_code: 'PHP-O',
    teacher: 'Nguyễn Văn Long',
    scoreFactor: 100,
  },
  {
    name: 'Khóa học lập trình NodeJS',
    image:
      'https://d1ymz67w5raq8g.cloudfront.net/Pictures/1024x536/9/9/2/507992_gettyimages548929129_199395_crop.jpg',
    learn_date: '11/06/2022',
    learn_date_end: '29/06/2022',
    qr_code: 'GER-I',
    teacher: 'Nguyễn Thu Hương',
    scoreFactor: 50,
  },
  {
    name: 'Khóa học lập trình PHP',
    image:
      'https://d.newsweek.com/en/full/2081409/teacher-talks-class.webp?w=1600&h=900&q=88&f=784086439dd086ece36b014d1fe4a40b',
    learn_date: '11/10/2022',
    learn_date_end: '29/12/2022',
    qr_code: 'PHP-O',
    teacher: 'Nguyễn Văn Long',
    scoreFactor: 1000,
  },
];

const { Option } = Select;

const Classes = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <BreadCrumb
          routes={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              name: 'Quản lý lớp học',
              path: '/classes',
            },
          ]}
        />

        <div className="taskbars">
          <div className="fillter">
            <Select defaultValue="lucy" style={{ width: 120 }} bordered={false}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
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
          <Row>
            {data?.length !== 0 &&
              data?.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <ClassItem
                    name={item.name}
                    image={item.image}
                    learn_date={item.learn_date}
                    learn_date_end={item.learn_date_end}
                    qr_code={item.qr_code}
                    teacher={item.teacher}
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
