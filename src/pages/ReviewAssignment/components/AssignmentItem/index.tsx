import { Avatar, Checkbox, Col, Row } from 'antd';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import './AssignmentItem.scss';

interface IAnswers {
  [key: string]: string[];
}

interface IAssignment {
  question_id: string;
  name: string;
  content: string;
  answer: string[];
  order?: number;
  answerSubmit?: any;
  correctAnswer: any;
}

const AssignmentItem: React.FC<IAssignment> = (props) => {
  const {
    answer,
    content,
    name,
    question_id,
    order,
    answerSubmit,
    correctAnswer,
  } = props;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const correctAnswers = useMemo(() => {
    const correctAnswers: any[] = [];
    if (correctAnswer) {
      correctAnswer.forEach((caswr: any) => {
        if (caswr.result) {
          correctAnswers.push(caswr.text);
        }
      });
    }
    return correctAnswers;
  }, [correctAnswer]);

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
              // value={dataAnswer[question_id]}
            >
              <Row gutter={16}>
                {answer?.length !== 0 &&
                  answer?.map((item, index) => {
                    let isCorrect = undefined;

                    // Đúng khi đáp án đó người dùng chọn và đúng
                    if (answerSubmit?.includes(item)) {
                      if (correctAnswers?.includes(item)) {
                        isCorrect = true;
                      } else {
                        isCorrect = false;
                      }
                    }

                    return (
                      <Col key={index} xs={24} sm={24} lg={12}>
                        <Checkbox
                          disabled
                          className={clsx(
                            isCorrect === true && 'correct',
                            isCorrect === false && 'incorrect'
                          )}
                          value={item}
                        >
                          <Avatar>
                            {alphabet.charAt(index++).toLowerCase()}
                          </Avatar>
                          {item as any}
                        </Checkbox>
                      </Col>
                    );
                  })}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentItem;
