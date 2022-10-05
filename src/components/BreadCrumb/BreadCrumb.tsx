import "./BreadCrumb.scss";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const BreadCrumb: React.FC = () => {
    return (<div className="breadcrumb">
        <Breadcrumb>
            <Breadcrumb.Item href="">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
                <span>Danh sách lớp học</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    </div>);
}

export default BreadCrumb;