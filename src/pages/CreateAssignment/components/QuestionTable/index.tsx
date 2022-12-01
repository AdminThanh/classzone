import { useQuery } from '@apollo/client';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetAllQuestionDocument } from 'gql/graphql';
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
  const { questionIds, handleCancel, handleOk, setDataQuestionList } = props;

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
      render: (_) => <Tag color="#2db7f5">HTML</Tag>,
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      render: (record, value) => (
        <div className="table__question">{renderHTML(value.question)}</div>
      ),
    },
  ];

  const { data } = useQuery(GetAllQuestionDocument);
  const listAllQuestion = data?.getAllQuestion.map((item, index) => ({
    id: item.id,
    key: item.id,
    question: item.question,
    index: index,
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
        dataSource={listAllQuestion}
      />
    </div>
  );
};

export default QuestionTable;
