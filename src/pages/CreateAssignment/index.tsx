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
  const [isOpenTableAddQuestion, setIsOpenTableAddQuestion] = useState(false);
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
      title: t('create_assignment.tag'),
      dataIndex: 'tags',
      width: 30,
      className: 'drag-visible table__tag',
    },
    {
      title: t('my_quession.quession'),
      dataIndex: 'question',
      render: (record, value) => (
        <div className="table__question">{value.question}</div>
      ),
    },
    {
      render: (record, value) => (
        <div className="questionItem-drag__action">
          {/* <UpdateIcon /> */}

          <BinIcon onClick={() => handleDeleteQuestion(value._id)} />
        </div>
      ),
    },
  ];

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

      const question_ids = newData.map((item) => item.key);
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
      <Form
        form={form}
        onFinish={(value) => {
          console.log(value);
        }}
      >
        <div className="create-assignment__skin">
          <div className="create-assignment__add-button"></div>
          <div className="create-assignment__header">
            <BreadCrumb
              routes={[
                {
                  name: t('navbar.home'),
                  path: '/',
                },
                {
                  name: t('create_assignment.create_assignment'),
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
                <FilterTags opts={tagOpts} isShowTagControl />
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
        title={t('create_assignment.add_assignment')}
        centered
        open={isOpenTableAddQuestion}
        onCancel={() => {
          setIsOpenTableAddQuestion(false);
        }}
        onOk={() => {
          setIsOpenTableAddQuestion(false);
        }}
        footer={null}
        width="90%"
      >
        <QuestionTable
          setDataQuestionList={(dataQuestionList: any) => {
            const question_ids = dataQuestionList.map((q: DataType) => q.key);

            form.setFieldValue('question_ids', question_ids);
            setDataQuestionList(dataQuestionList);
          }}
        />
      </Modal>
    </div>
  );
};

export default CreateAssignment;
