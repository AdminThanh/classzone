import { useQuery } from '@apollo/client';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetAllQuestionDocument, GetMyQuestionDocument } from 'gql/graphql';
import { renderHTML } from 'pages/Question';
import React, { useEffect, useState } from 'react';

// const fakeAPI: Promise<DataType[]> = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve([
//       {
//         key: '123123123',
//         question:
//           ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
//         tags: [],
//         index: 0,
//       },
//       {
//         key: 'asdasdasd',
//         question:
//           ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

//         tags: [],
//         index: 1,
//       },
//       {
//         key: 'zxczxczxc',
//         question:
//           ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
//         tags: [],
//         index: 2,
//       },
//       {
//         key: '4',
//         question:
//           ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
//         tags: [],
//         index: 3,
//       },
//       {
//         key: '5',
//         question:
//           ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',

//         tags: [],
//         index: 4,
//       },
//       {
//         key: '6',
//         question:
//           ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
//         tags: [],
//         index: 5,
//       },
//     ]);
//   });
// });

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

  console.log('dataQuestionList', dataQuestionList);

  const [listQuestion, setListQuestion] = useState<DataType[]>([]);
  const [selectedKey, setSelectedKey] = useState<React.Key[]>(questionIds);

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
          {tags.map((tag: any, index: any) => {
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
  console.log('getMyQuestion ', getMyQuestion);

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
