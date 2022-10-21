import { Menu } from 'antd';

interface DropdownAction {
  handleUpdateCol: (id: string) => void;
  dataIndex: string;
}

const DropdownAction = (props: DropdownAction) => {
  const { dataIndex, handleUpdateCol } = props;
  return (
    <div>
      <Menu
        items={[
          {
            label: 'Sửa',
            key: '1',
            onClick: ({ domEvent: e }) => {
              e.stopPropagation();

              handleUpdateCol(dataIndex);
            },
          },
          {
            label: 'Xóa',
            key: '2',
          },
        ]}
      />
    </div>
  );
};

export default DropdownAction;
