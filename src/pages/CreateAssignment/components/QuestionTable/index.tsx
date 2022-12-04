import { useQuery } from '@apollo/client';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetMyQuestionDocument } from 'gql/graphql';
import { renderHTML } from 'pages/Question';
import React, { useState } from 'react';

interface DataType {
  id: string;
  key: string;
  question: string;
  // tags: string[];
  index: number;
}

const QuestionTable: React.FC<any> = (props) => {
  const {
    questionIds,
    handleCancel,
    handleOk,
    setDataQuestionList,
    dataQuestionList,
  } = props;

  const listIDSelected = dataQuestionList?.map(
    (item: any) => item.id as React.Key[]
  );

  
  const [listQuestion, setListQuestion] = useState<DataType[]>([]);
  const [selectedKey, setSelectedKey] = useState<React.Key[]>(listIDSelected);

  const handleSelectKey = (
    selectedRowKeys: React.Key[],
    selectedQuestionList: DataType[]
  ) => {
    setSelectedKey(selectedRowKeys);
    setDataQuestionList(selectedQuestionList);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Thẻ',
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
      title: 'Câu hỏi',
      dataIndex: 'question',
      render: (record, value) => (
        <div className="table__question">{renderHTML(value.question)}</div>
      ),
    },
  ];

  const { data } = useQuery(GetMyQuestionDocument);
  const getMyQuestion = data?.getMyQuestion.map((item, index) => ({
    id: item.id,
    key: item.id,
    question: item.question,
    index: index,
    tags: item.tags,
  }));

  // useEffect(() => {
  //   fakeAPI.then((res) => {
  //     setListQuestion(res);
  //   });
  // }, []);

  return (
    <div className="QuestionTable">
      <Table
        rowSelection={{
          onChange: handleSelectKey,
          selectedRowKeys: selectedKey,
        }}
        columns={columns}
        dataSource={getMyQuestion}
      />
    </div>
  );
};

export default QuestionTable;
