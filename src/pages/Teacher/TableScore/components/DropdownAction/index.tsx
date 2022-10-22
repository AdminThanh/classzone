import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';

interface DropdownAction {
  handleUpdateCol: (data: any) => void;
  handleDeleteCol: (_id: string) => void;
  data: any;
}

const DropdownAction = (props: DropdownAction) => {
  const { data, handleUpdateCol, handleDeleteCol } = props;

  const { t } = useTranslation();
  return (
    <div>
      <Menu
        items={[
          {
            label: t('table_score.update_action'),
            key: '1',
            onClick: ({ domEvent: e }) => {
              e.stopPropagation();

              handleUpdateCol(data);
            },
          },
          {
            label: t('table_score.delete_action'),
            key: '2',
            onClick: ({ domEvent: e }) => {
              e.stopPropagation();

              handleDeleteCol(data._id);
            },
          },
        ]}
      />
    </div>
  );
};

export default DropdownAction;
