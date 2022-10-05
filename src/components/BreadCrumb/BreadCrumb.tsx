import "./BreadCrumb.scss";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

interface RouteItem {
    name: string,
    path: string
}

interface Props {
    routes: RouteItem[],
}

function BreadCrumb(props: Props) {
    const { routes } = props;

    return (<div className="breadcrumb">
        <Breadcrumb>
            <Breadcrumb.Item href="">
                <HomeOutlined />
            </Breadcrumb.Item>
            {
                routes.map((route) => (
                    <Breadcrumb.Item href={route.path}>
                        <span>{route.name}</span>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    </div>);
}

export default BreadCrumb;