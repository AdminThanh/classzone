import { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
// import { ShowmoreIcon } from 'utils/drawer';
import BreadCrumb from 'components/BreadCrumb';
import QuestionItem from './components/QuestionItem';
import './CreateAssignment.scss';
import { Form, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import FilterTags, { IOptionTag } from 'components/FilterTags';
import { useForm } from 'antd/es/form/Form';
import Button from 'components/Button';
import { BinIcon, EditIcon, SaveIcon, UpdateIcon } from 'utils/drawer';
import 'antd/dist/antd.css';
// import './index.css';
import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { arrayMoveImmutable } from 'array-move';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import QuestionTable from './components/QuestionTable';

interface IQuestions {
  _id: string;
  // order: number;
  question: string;
}

const fakeAPI: Promise<any[]> = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        key: '1',
        _id: '123123123',
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 0,
      },
      {
        key: '2',
        _id: 'asdasdasd',
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

        tags: [],
        index: 1,
      },
      {
        key: '3',
        _id: 'zxczxczxc',
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 2,
      },
      {
        key: '4',
        _id: '4',
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 3,
      },
      {
        key: '5',
        _id: '5',
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

        tags: [],
        index: 4,
      },
      {
        key: '6',
        _id: '6',
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 5,
      },
      {
        key: '7',
        _id: '7',
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 7,
      },
      {
        key: '8',
        _id: '8',
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

        tags: [],
        index: 8,
      },
      {
        key: '9',
        _id: '9',
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 9,
      },
      {
        key: '10',
        _id: '10',
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 10,
      },
      {
        key: '11',
        _id: '11',
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

        tags: [],
        index: 11,
      },
      {
        key: '12',
        _id: '12',
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 12,
      },
      {
        key: '13',
        _id: '13',
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 13,
      },
      {
        key: '14',
        _id: '14',
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

        tags: [],
        index: 14,
      },
      {
        key: '15',
        _id: '15',
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
        tags: [],
        index: 15,
      },
    ]);
  });
});

interface DataType {
  key: string;
  question: string;
  tags: string[];
  index: number;
  _id: string;
}

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const SortableItem = SortableElement(
  (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
);
const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />
);

const CreateAssignment = () => {
  const [dataQuestionList, setDataQuestionList] = useState<DataType[]>([]);
  const [isOpenTableAddQuestion, setIsOpenTableAddQuestion] = useState(true);
  const { t } = useTranslation();
  const [form] = useForm();

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible table__draghandle',
      render: () => <DragHandle />,
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      width: 30,
      className: 'drag-visible table__tag',
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      render: (record, value) => (
        <div className="table__question">{value.question}</div>
      ),
    },
    {
      render: (record, value) => (
        <div className="questionItem-drag__action">
          <UpdateIcon />

          <BinIcon onClick={() => handleDeleteQuestion(value._id)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fakeAPI.then((res) => {
      setDataQuestionList(res);
    });
  }, []);

  const handleDeleteQuestion = (id: string) => {
    const newDataQuestionList = dataQuestionList.filter((value) => {
      return value._id !== id;
    });

    setDataQuestionList(newDataQuestionList);
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataQuestionList.slice(),
        oldIndex,
        newIndex
      ).filter((el: DataType) => !!el);

      const question_ids = newData.map((item) => item._id);
      form.setFieldsValue({
        question_ids: question_ids,
      });
      setDataQuestionList(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({
    className,
    style,
    ...restProps
  }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataQuestionList.findIndex(
      (x) => x.index === restProps['data-row-key']
    );
    return <SortableItem index={index} {...restProps} />;
  };

  const tagOpts: IOptionTag[] = useMemo(
    () => [
      {
        label: 'Tiếng Anh',
        value: '1',
      },
      {
        label: 'Tiếng Đức',
        value: '2',
      },
    ],
    []
  );

  return (
    <div className="create-assignment">
      {/* Nav & Breadcrumb */}
      <button onClick={() => console.log(form.getFieldsValue())}>
        Hiện thị
      </button>
      <Form
        form={form}
        onFinish={(value) => {
          console.log(value, dataQuestionList);
        }}
      >
        <div className="create-assignment__skin">
          <div className="create-assignment__add-button"></div>
          <div className="create-assignment__header">
            <BreadCrumb
              routes={[
                {
                  name: 'Tạo bài kiểm tra',
                  path: '/create_assignment',
                },
              ]}
            />

            <div className="create-assignment__control-panel">
              <Form.Item
                name="asssignment_name"
                label={t('create_assignment.assignment_name')}
              >
                <Input />
              </Form.Item>
              <Form.Item name="tags" label={t('create_assignment.tag')}>
                <FilterTags opts={tagOpts} />
              </Form.Item>
            </div>

            <Button
              icon={<EditIcon />}
              title={t('create_assignment.add_question')}
              type="primary"
              onClick={() => setIsOpenTableAddQuestion(true)}
            />
          </div>
          <div className="create-assignment__questions-skin">
            <div className="create-assignment__question-list">
              <Form.Item name="question_ids">
                <Table
                  pagination={false}
                  dataSource={dataQuestionList}
                  columns={columns}
                  rowKey="index"
                  components={{
                    body: {
                      wrapper: DraggableContainer,
                      row: DraggableBodyRow,
                    },
                  }}
                />
              </Form.Item>
            </div>
            <div className="create-assignment__action">
              <Button
                icon={<SaveIcon />}
                title={t('create_assignment.add_assignment')}
                type="second"
                htmlType="submit"
              />
            </div>
          </div>
        </div>
      </Form>

      <Modal
        title="Thêm câu hỏi"
        centered
        open={isOpenTableAddQuestion}
        onOk={() => {
          setIsOpenTableAddQuestion(false);
        }}
        onCancel={() => setIsOpenTableAddQuestion(false)}
        width="90%"
      >
        <QuestionTable
          setDataQuestionList={setDataQuestionList}
          // questionIds={[]}
        />
      </Modal>
    </div>
  );
};

export default CreateAssignment;
