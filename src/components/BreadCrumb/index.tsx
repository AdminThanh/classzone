import './BreadCrumb.scss';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface RouteItem {
  name: string;
  path: string;
}

interface Props {
  routes: RouteItem[];
}

function BreadCrumb(props: Props) {
  const { routes } = props;

  return (
    <div className="breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        {routes.map((route) => (
          <Breadcrumb.Item key={route.path}>
            <Link to={route.path}>
              <span>{route.name}</span>
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
