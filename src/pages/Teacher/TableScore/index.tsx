import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType, ColumnType } from 'antd/lib/table';

import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Space,
} from 'antd';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { getAverage } from 'utils/calculator';
import DropdownAction from './components/DropdownAction';
import ModalFormColumn from './components/ModalFormColumn';
import './tableScore.scss';
import { StringLiteral } from 'typescript';
interface DataType {
  key: React.Key;
  name: string;
  sadasdaccans: number;
  dasdjosakfoaskdas: number;
  student_id: string;
  // [key: string]: number | any;
}

type DataIndex = keyof DataType;

interface IColumnTable {
  // Cần xử lý khi có api vì typescript không chạy trên runtime
  _id: 'sadasdaccans' | 'dasdjosakfoaskdas'; // Interface này phải là tất cả id của từng bảng
  name: string;
  type: string;
  test: string;
  multiplier: number;
}

interface IScoreColumn {
  title: JSX.Element;
  dataIndex: string;
  render: (value: number, record: DataType) => JSX.Element;
  width: string;
  sorter: (a: DataType, b: DataType) => number;
  filters: {
    text: string;
    value: string;
  }[];
  onFilter: (type: string, record: DataType) => boolean;
}

const fetchColumnTable: IColumnTable[] = [
  {
    _id: 'dasdjosakfoaskdas',
    name: 'Bài kiểm tra 15 phút',
    type: 'normal',
    test: '15',
    multiplier: 1,
  },
  {
    _id: 'sadasdaccans',
    name: 'Bài kiểm tra 45 phút',
    type: 'normal',
    test: '45',
    multiplier: 2,
  },
];

const TableScore = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState<DataType[]>(() => {
    const result = [];

    result.push({
      key: '1',
      name: 'Đào Đức Minh Khôi',
      sadasdaccans: 9,
      dasdjosakfoaskdas: 10,
      student_id: '101',
    });

    result.push({
      key: '2',
      name: 'Phan Trọng Nghĩa',
      sadasdaccans: 5,
      dasdjosakfoaskdas: 7.5,
      student_id: '102',
    });

    result.push({
      key: '3',
      name: 'Hồ Đắc Di',
      sadasdaccans: 6,
      dasdjosakfoaskdas: 8.3,
      student_id: '103',
    });

    // for (let i = 0; i < 10; i++) {
    //   result.push({
    //     key: i,
    //     name: `Clone ${i}`,
    //     average: randomNumber(0, 10),
    //     sadasdaccans: randomNumber(0, 10),
    //     dasdjosakfoaskdas: randomNumber(0, 10),
    //   });
    // }
    return result;
  });
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

  const handleChangeScoreStudent = (
    { value, student_id }: { value: number; student_id: string },
    { record }: any,
    colId: string
  ) => {
    const newState: any = structuredClone(data);

    const index = newState.findIndex(
      (record: any) => record.student_id === student_id
    );

    newState[index][colId] = value;
    setData(newState);
  };

  const renderScoreColumn = (columns: IColumnTable[]): IScoreColumn[] => {
    return columns.map((col: IColumnTable) => ({
      title: (
        <Dropdown
          overlay={() => (
            <DropdownAction
              data={col}
              handleDeleteCol={handleDeleteCol}
              handleUpdateCol={handleUpdateCol}
            />
          )}
          trigger={['contextMenu']}
        >
          <div>{col.name}</div>
        </Dropdown>
      ),
      dataIndex: col._id,
      render: (value: number, record: DataType) => (
        <InputNumber
          value={value}
          max={10}
          min={0}
          onChange={(value) => {
            if (value) {
              handleChangeScoreStudent(
                { value, student_id: record.student_id },
                {
                  value,
                  record,
                },
                col._id
              );
            }
          }}
        />
      ),
      width: '15%',
      sorter: (a: DataType, b: DataType) => {
        return a[col._id] - b[col._id];
      },
      filters: [
        {
          text: t('table_score.above_average'),
          value: 'above average',
        },
        {
          text: t('table_score.below_average'),
          value: 'below average',
        },
      ],
      onFilter: (type: string, record: DataType) => {
        switch (type) {
          case 'above average':
            return record[col._id] >= 5;
          case 'below average':
            return record[col._id] < 5;
          default:
            throw new Error('Type filter not found');
        }
      },
    }));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleUpdateCol = (data: any) => {
    setModalCol({
      data,
      isOpen: true,
      isDirty: false,
    });
  };

  const handleDeleteCol = (_id: string) => {
    console.log('Delete', _id);
  };

  const handleSaveTable = () => {};

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

  // Render score column of data in api
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
            {t('table_score.search')}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t('table_score.reset')}
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
            {t('table_score.filter')}
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

    // Render score column
    ...(renderScoreColumn(fetchColumnTable) as any),

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
          <PlusCircleOutlined />
          <span>{t('table_score.add_score_column')}</span>
        </div>
      ),
    },
    {
      title: t('table_score.average'),
      key: 'average',
      dataIndex: 'average',
      fixed: 'right',
      width: 200,
      // sorter: (a, b) => a.average - b.average,
      render: (_, record: any) => {
        const scores: any = [];
        Object.keys(record || {}).forEach((key: any) => {
          if (key === 'key' || key === 'name' || key === 'student_id') {
            return;
          }

          const indexOfColumn = fetchColumnTable.findIndex(
            (col) => col._id === key
          );
          const multiplier = fetchColumnTable[indexOfColumn]?.multiplier || 1;

          // Handle multiplier
          for (let i = 0; i < multiplier; i++) {
            scores.push(record[key] as number);
          }
        });

        return <div>{getAverage(scores).toFixed(2)}</div>;
      },
    },
  ];

  return (
    <div className="tableScore">
      <Table
        className="tableScore__table"
        columns={columns}
        pagination={false}
        dataSource={data}
        scroll={{ x: 1500 }}
        locale={{
          triggerDesc: t('table_score.sort_desc'),
          triggerAsc: t('table_score.sort_asc'),
          cancelSort: t('table_score.cancel_sort'),
        }}
      />

      <Modal
        title={
          modalCol.data?._id
            ? t('table_score.update_score_column')
            : t('table_score.add_score_column')
        }
        open={modalCol.isOpen}
        // onOk={handleOk}
        destroyOnClose={true}
        onCancel={handleCancelModal}
        footer={null}
      >
        <ModalFormColumn
          data={modalCol.data}
          type={modalCol.data?._id ? 'update' : 'add'}
        />
      </Modal>

      <Modal closable={false}>
        <div style={{ color: 'yellow', background: 'orange' }}>
          {t('table_score.message_close_modal')}
        </div>
      </Modal>
    </div>
  );
};

export default TableScore;
