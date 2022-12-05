import { useEffect, useMemo, useState } from 'react';
// import { ShowmoreIcon } from 'utils/drawer';
import { Form, Input, Modal, notification, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BreadCrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import FilterTags from 'components/FilterTags';
import { useTranslation } from 'react-i18next';
import { BinIcon, EditIcon, SaveIcon } from 'utils/drawer';
import './CreateAssignment.scss';
// import './index.css';
import { MenuOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { arrayMoveImmutable } from 'array-move';
import {
  CreateExamDocument,
  GetExamByIdDocument,
  UpdateExamDocument,
} from 'gql/graphql';
import { renderHTML } from 'pages/Question';
import { useParams } from 'react-router-dom';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import QuestionTable from './components/QuestionTable';

interface IQuestions {
  id: string;
  // order: number;
  question: string;
}

interface IDataTypeQuestion {
  id: string;
  key: string;
  question: string;
  // tags: string[];
  index: number;
}
interface DataType {
  key: string;
  question: string;
  tags: string[];
  index: number;
  name: string;
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
  const [fireCreateExam] = useMutation(CreateExamDocument);
  const [fireUpdateExam] = useMutation(UpdateExamDocument);
  const { t } = useTranslation();
  const [form] = useForm();
  const { examId } = useParams();
  const skip = examId ? false : true;
  const { data, refetch } = useQuery(GetExamByIdDocument, {
    variables: {
      id: examId as string,
    },
    skip,
  });

  useEffect(() => {
    const dataExam = data?.getExamById?.questions?.map((item, index) => ({
      id: item.id,
      key: item.id,
      question: item.question,
      tags: item.tags,
      index: index,
    }));

    if (dataExam) {
      setDataQuestionList(dataExam as any);
    }
    const question_ids = data?.getExamById?.questions.map((q: any) => q.id);
    form.setFieldsValue({
      asssignment_name: data?.getExamById?.name,
      question_ids: question_ids,
      tags: data?.getExamById?.tags?.map((item) => item.id),
    });
  }, [data]);

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
      render: (tags) => (
        <>
          {tags?.map((tag: any, index: any) => {
            return (
              <Tag color={tag.color} key={index}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t('my_quession.quession'),
      dataIndex: 'question',
      render: (record, value) => (
        <div className="table__question">{renderHTML(value.question)}</div>
      ),
    },
    {
      render: (record, value) => (
        <div className="questionItem-drag__action">
          <BinIcon onClick={() => handleDeleteQuestion(value.key)} />
        </div>
      ),
    },
  ];

  const handleDeleteQuestion = (key: string) => {
    const newDataQuestionList = dataQuestionList.filter((value) => {
      return value.key !== key;
    });
    console.log('id', key);
    console.log('newDataQuestionList', newDataQuestionList);

    setDataQuestionList(newDataQuestionList);
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataQuestionList.slice(),
        oldIndex,
        newIndex
      ).filter((el: DataType) => !!el);
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

  const tagOpts: any[] = useMemo(
    () => [
      {
        color: '#28ffe8',
        id: 'd6eadcf0-7da8-4aa2-9c6a-7fec720bd618',
        name: 'CSS',
      },
      {
        color: '#28ffe8',
        id: 'd6eadcf0-7da8-4aa2-9c6a-7fec720bd618',
        name: 'CSS',
      },
    ],
    []
  );

  const listTags = data?.getExamById?.tags?.map((item) => item.name);

  const handleAxam = async (value: any) => {
    console.log(value);
    if (examId) {
      try {
        await fireUpdateExam({
          variables: {
            updateExamInput: {
              name: value.asssignment_name as string | '',
              questions: value.question_ids,
              tags: value.tags,
            },
            id: examId,
          },
        });
        notification.success({
          key: 'success',
          message: t('action.edit_success'),
        });
        refetch();
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.edit_error'),
        });
      }
    } else {
      try {
        await fireCreateExam({
          variables: {
            createExamInput: {
              name: value.asssignment_name as string | '',
              questions: value.question_ids,
              tags: value.tags,
            },
          },
        });
        notification.success({
          key: 'success',
          message: t('action.add_success'),
        });
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.add_error'),
        });
      }
    }
  };

  return (
    <div className="create-assignment">
      {/* Nav & Breadcrumb */}
      <Form
        form={form}
        onFinish={(value) => {
          handleAxam(value);
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
                <FilterTags
                  listTags={listTags}
                  opts={tagOpts}
                  isShowTagControl
                />
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
          dataQuestionList={dataQuestionList}
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
