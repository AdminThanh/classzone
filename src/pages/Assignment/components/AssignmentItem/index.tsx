import { Avatar, Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React from 'react';
import './AssignmentItem.scss';

interface IAnswer {
  label: string;
  value: string;
}

interface IAssignment {
  question_id: string;
  name: string;
  content: string;
  answer: string[];
  handleAnswered: (id: string, value: any) => void;
  order?: number;
  dataAnswer?: string[];
}

const AssignmentItem: React.FC<IAssignment> = (props) => {
  const {
    answer,
    content,
    name,
    question_id,
    handleAnswered,
    order,
    dataAnswer,
  } = props;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const onChange = (checkedValues: CheckboxValueType[]) => {
    if (handleAnswered && handleAnswered instanceof Function) {
      handleAnswered(question_id, checkedValues);
    }
  };

  return (
    <div className="content__question-item">
      {order && (
        <div className="question__heading">
          <p>
            Câu<span>{order < 10 ? '0' + order : order}</span>
          </p>
        </div>
      )}
      <div className="question">
        <div className="question__name">
          <strong>{name}</strong>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
        <div className="answer">
          <div className="answer__title">
            <label>Chọn đáp án đúng:</label>
          </div>
          <div className="answer__list">
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={onChange}
            >
              <Row gutter={16}>
                {answer?.length !== 0 &&
                  answer?.map((item, index) => (
                    <Col key={index} xs={24} sm={24} lg={12}>
                      <Checkbox value={item}>
                        <Avatar>
                          {alphabet.charAt(index++).toLowerCase()}
                        </Avatar>
                        {item as any}
                      </Checkbox>
                    </Col>
                  ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentItem;
