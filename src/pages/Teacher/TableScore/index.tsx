import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType, ColumnType } from 'antd/lib/table';

import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  InputRef,
  Modal,
  notification,
  Space,
  Spin,
} from 'antd';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import BreadCrumb from 'components/BreadCrumb';
import {
  ColumnScoreType,
  DeleteColumnScoreDocument,
  GetClassByIdDocument,
  GetColumnScoresByClassDocument,
  UpdateTableScoreDocument,
} from 'gql/graphql';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAverage } from 'utils/calculator';
import DropdownAction from './components/DropdownAction';
import ModalFormColumn from './components/ModalFormColumn';
import './tableScore.scss';
interface DataType {
  key: React.Key;
  name: string;
  [key: string]: number | string;
  student_id: string;
}

type DataIndex = keyof DataType;

interface IColumnTable {
  // Cần xử lý khi có api vì typescript không chạy trên runtime
  id: string;
  name: string;
  type: string;
  test: string;
  multiplier: number;
}

const fakeAPIScoreStudent: Promise<DataType[]> = new Promise(
  (resolve, reject) => {
    resolve([
      {
        key: '1',
        name: 'Đào Đức Minh Khôi',
        // '6843f699-9feb-4e35-bbc9-a73bf782aa2f': 9,
        // dasdjosakfoaskdas: 10,
        student_id: '101',
      },
      {
        key: '2',
        name: 'Phan Trọng Nghĩa',
        // sadasdaccans: 5,
        // dasdjosakfoaskdas: 7.5,
        student_id: '102',
      },
      {
        key: '3',
        name: 'Hồ Đắc Di',
        // sadasdaccans: 6,
        // dasdjosakfoaskdas: 8.3,
        student_id: '103',
      },
      {
        key: '4',
        name: 'Nguyễn Tất Thành',
        // sadasdaccans: 9,
        // dasdjosakfoaskdas: 9.5,
        student_id: '104',
      },
    ]);
  }
);

const TableScore = () => {
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();
  const { classId } = useParams();

  const { data, loading, refetch } = useQuery(GetColumnScoresByClassDocument, {
    variables: {
      id: classId || '',
    },
  });

  const {
    data: studentData,
    loading: studentLoading,
    refetch: studentRefetch,
  } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId || '',
    },
  });

  const [fireDeleteTableScore] = useMutation(DeleteColumnScoreDocument);
  const [fireUpdateTableScore] = useMutation(UpdateTableScoreDocument);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<DataIndex>('');
  const [dataTable, setDataTable] = useState<any[]>();
  const [dataScoreStudent, setDataScoreStudent] = useState<DataType[]>([]);
  const [modalCol, setModalCol] = useState<{
    data?: any;
    isOpen: boolean;
    isDirty: boolean;
  }>({
    data: undefined,
    isOpen: false,
    isDirty: false,
  });

  useEffect(() => {
    setDataTable(data?.getColumnScoresByClass);
  }, [data?.getColumnScoresByClass]);

  useEffect(() => {
    // fakeAPITable.then((res) => {
    //   setDataTable(res);
    // });

    if (studentData) {
      const students = studentData.getClassById.students;
      const colScore: any = data?.getColumnScoresByClass;

      const newStudent = students?.map((student) => {
        const scoreOfStudent: any = {};

        colScore?.forEach((cs: any) => {
          Object.keys(cs?.scores || {}).forEach((student_id) => {
            if (student.id === student_id) {
              scoreOfStudent[cs.id] = cs?.scores[student_id] || null;
            }
          });
        });

        return {
          key: student.id,
          name: student.firstName || '' + student.lastName || '',
          student_id: student.id,
          ...scoreOfStudent,
        };
      });

      setDataScoreStudent(newStudent as DataType[]);
    }

    // Fake data
    // fakeAPIScoreStudent.then((res) => {
    //   setDataScoreStudent(res);
    // });
  }, [studentData, data]);

  const handleChangeScoreStudent = (
    { value, student_id }: { value: number; student_id: string },
    { record, value: valueChange }: { record: DataType; value: number },
    colId: string
  ) => {
    const newState: DataType[] = structuredClone(dataScoreStudent);

    const index = newState.findIndex(
      (record) => record.student_id === student_id
    );

    newState[index][colId] = value;
    setDataScoreStudent(newState);
  };

  const renderScoreColumn = (columns?: IColumnTable[]) => {
    return (
      columns?.map((col: IColumnTable) => ({
        key: col.id,
        title: (
          <Dropdown
            overlay={() => (
              <DropdownAction
                data={col}
                handleDeleteCol={() => handleDeleteCol(col.id)}
                handleUpdateCol={handleUpdateCol}
              />
            )}
            trigger={['contextMenu']}
          >
            <div>{col.name}</div>
          </Dropdown>
        ),
        dataIndex: col.id,
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
                  col.id
                );
              }
            }}
          />
        ),
        width: '15%',
        sorter: (a: DataType, b: DataType): number => {
          return +a[col.id]?.valueOf() - +b[col.id]?.valueOf();
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
              return record[col.id] >= 5;
            case 'below average':
              return record[col.id] < 5;
            default:
              throw new Error('Type filter not found');
          }
        },
      })) || []
    );
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleSaveTableScore = async (e: React.MouseEvent<HTMLElement>) => {
    notification.open({
      message: (
        <>
          <Spin /> &nbsp; Đang lưu bảng điểm
        </>
      ),
    });

    const listColumnScore = dataTable?.map((colScore) => {
      const scores: any = {};

      dataScoreStudent.forEach((student) => {
        scores[student.student_id] = student[colScore.id];
      });

      return {
        id: colScore.id,
        scores,
      };
    });

    try {
      const result = await fireUpdateTableScore({
        variables: {
          updateTableScore: {
            columnScores: listColumnScore,
          },
          class_id: classId || '',
        },
      });
      notification.destroy();
      notification.success({
        message: 'Lưu bảng điểm thành công',
      });
    } catch (err) {
      notification.destroy();
      notification.error({
        message: 'Có lỗi xảy ra',
      });
    }
  };

  const handleUpdateCol = (data: any) => {
    setModalCol({
      data,
      isOpen: true,
      isDirty: false,
    });
  };

  const handleRefetchTableScore = () => {
    refetch();
  };

  const handleDeleteCol = async (id: string) => {
    notification.open({
      message: (
        <>
          <Spin /> &nbsp; Đang xoá
        </>
      ),
    });
    try {
      await fireDeleteTableScore({
        variables: {
          id,
        },
      });

      notification.destroy();
      notification.success({
        message: 'Xoá cột điểm thành công',
      });

      refetch();
    } catch (err) {
      notification.destroy();
      notification.error({
        message: 'Có lỗi xảy ra khi xoá cột điểm',
      });
    }
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
    // Cột họ và tên
    {
      title: t('table_score.full_name'),
      width: '20%',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },

    // Render score columns from api response
    ...(renderScoreColumn(dataTable) as any),

    // Cột thêm cột điểm
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
      render: (_, record: DataType) => {
        const scores: number[] = [];
        Object.keys(record || {}).forEach((key: string) => {
          if (key === 'key' || key === 'name' || key === 'student_id') {
            return;
          }

          const indexOfColumn = dataTable?.findIndex((col) => col.id === key);

          let multiplier;

          if (dataTable && indexOfColumn) {
            multiplier = dataTable[indexOfColumn]?.multiplier || 1;
          } else {
            multiplier = 1;
          }

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
      <BreadCrumb
        routes={[
          {
            name: 'Lớp học NODEJS',
            path: '/class_detail',
          },
          {
            name: t('navbar.table_score'),
            path: '/',
          },
        ]}
      />
      <Table
        className="tableScore__table"
        columns={columns}
        pagination={false}
        dataSource={dataScoreStudent}
        scroll={{ x: 1500 }}
        locale={{
          triggerDesc: t('table_score.sort_desc'),
          triggerAsc: t('table_score.sort_asc'),
          cancelSort: t('table_score.cancel_sort'),
        }}
      />
      <div className="tableScore__footer">
        <Button onClick={handleSaveTableScore}>
          {t('table_score.save_table')}
        </Button>
      </div>

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
          listColumnScore={data?.getColumnScoresByClass as [ColumnScoreType]}
          class_id={classId}
          onCancel={handleCancelModal}
          handleRefetchTableScore={handleRefetchTableScore}
          data={modalCol.data}
          type={modalCol.data?.id ? 'update' : 'add'}
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
