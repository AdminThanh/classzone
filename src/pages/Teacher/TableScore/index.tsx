import Table, { ColumnsType, ColumnType } from 'antd/lib/table';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

import './tableScore.scss';
import { Button, Dropdown, Input, InputRef, Menu, Modal, Space } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FilterConfirmProps, SorterResult } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import ModalFormColumn from './components/ModalFormColumn';
import DropdownAction from './components/DropdownAction';
import { useTranslation } from 'react-i18next';
interface DataType {
  key: React.Key;
  name: string;
  average: number;
  fiveteen_minutes: number;
}

type DataIndex = keyof DataType;

const TableScore = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalCol, setModalCol] = useState<{
    data?: any;
    isOpen: boolean;
    isDirty: boolean;
  }>({
    data: undefined,
    isOpen: false,
    isDirty: false,
  });
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();

  const randomNumber = (min: number, max: number) =>
    Math.round(Math.random() * max + min);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleUpdateCol = (id: string) => {
    setModalCol({
      data: {
        id,
      },
      isOpen: true,
      isDirty: false,
    });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleCancelModal = () => {
    setModalCol({
      ...modalCol,
      isOpen: false,
      isDirty: false,
    });
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: t('table_score.full_name'),
      width: '20%',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
    {
      title: (
        <Dropdown
          overlay={() => (
            <DropdownAction
              dataIndex={'fiveteen_minutes'}
              handleUpdateCol={handleUpdateCol}
            />
          )}
          trigger={['contextMenu']}
        >
          <div>Điểm kiểm tra 15 phút</div>
        </Dropdown>
      ),
      dataIndex: 'fiveteen_minutes',
      width: '15%',
      sorter: (a, b) => a.fiveteen_minutes - b.fiveteen_minutes,
      filters: [
        {
          text: 'Trên trung bình',
          value: 'above average',
        },
        {
          text: 'Dưới trung bình',
          value: 'below average',
        },
      ],
      onFilter: (type, record) => {
        switch (type) {
          case 'above average':
            return record.fiveteen_minutes >= 5;
          case 'below average':
            return record.fiveteen_minutes < 5;
          default:
            throw new Error('Type filter not found');
        }
      },
    },
    {
      title: (
        <div
          className="tableScore__addColBtn"
          onClick={() =>
            setModalCol({
              data: {},
              isOpen: true,
              isDirty: false,
            })
          }
        >
          <PlusCircleOutlined /> <span>Thêm cột</span>
        </div>
      ),
    },
    {
      title: 'Điểm trung bình',
      key: 'average',
      dataIndex: 'average',
      fixed: 'right',
      width: 100,
      sorter: (a, b) => a.average - b.average,
      //   render: (value) => <div>{value}</div>,
    },
  ];

  const data: DataType[] = useMemo(() => {
    const result = [];
    for (let i = 0; i < 50; i++) {
      result.push({
        key: i,
        name: `Edrward ${i}`,
        average: randomNumber(0, 10),
        fiveteen_minutes: randomNumber(0, 10),
      });
    }
    return result;
  }, []);

  return (
    <div className="tableScore">
      <Table
        className="tableScore__table"
        columns={columns}
        pagination={false}
        dataSource={data}
        scroll={{ x: 1500 }}
        locale={{
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần',
          cancelSort: 'Hủy sắp xếp',
        }}
      />

      <Modal
        title={modalCol.data?.id ? 'Sửa cột điểm' : 'Thêm cột điểm'}
        open={modalCol.isOpen}
        // onOk={handleOk}
        destroyOnClose={true}
        onCancel={handleCancelModal}
        footer={null}
      >
        <ModalFormColumn type={modalCol.data?.id ? 'edit' : 'add'} />
      </Modal>

      <Modal closable={false}>
        <div style={{ color: 'yellow', background: 'orange' }}>
          Dữ liệu chưa được lưu bạn có chắc muốn tắt
        </div>
      </Modal>
    </div>
  );
};

export default TableScore;
