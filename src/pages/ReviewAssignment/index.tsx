import { useQuery } from '@apollo/client';
import { Modal, Spin } from 'antd';
import { clsx } from 'clsx';
import { GetAssignmentByIdDocument, GetExamByIdDocument } from 'gql/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { NextIcon, PrevIcon } from 'utils/drawer';
// import NextIcon from '../../assets/images/nextIcon.svg';
// import PrevIcon from '../../assets/images/prevIcon.svg';
import AssignmentItem from './components/AssignmentItem';
import Timer from './components/Timer';
import './ReviewAssignment.scss';

const { confirm } = Modal;

interface IAnswer {
  label: string;
  value: string;
}
interface IDataAssignment {
  question_id: string;
  name: string;
  content: string;
  answer: string[];
}

const NextArrow = (props: any) => {
  const { onClick } = props;

  return (
    <div onClick={onClick} className="content__answer-arrow">
      <NextIcon />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;

  return (
    <div onClick={onClick} className="content__answer-arrow">
      <PrevIcon />
    </div>
  );
};

const ReviewAssignment = () => {
  const [listQuestion, setListQuestion] = useState<IDataAssignment[]>([]);

  console.log('listQuestion', listQuestion);
  const [nameAssignment, setNameAssignment] = useState('');
  const [order, setOrder] = useState(1);

  const [loadingItem, setLoadingItem] = useState(false);
  const { t } = useTranslation();
  const { examId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { data: dataAssignment } = useQuery(GetAssignmentByIdDocument, {
    variables: {
      id: assignmentId || '',
    },
  });

  const { data: dataExam } = useQuery(GetExamByIdDocument, {
    variables: {
      id: examId || '',
    },
  });

  useEffect(() => {
    setNameAssignment(dataExam?.getExamById.name as string);

    const dataQuestion = dataExam?.getExamById.questions.map((item) => ({
      content: item.question,
      answer: item.answers,
      name: 'Đọc đoạn văn sau và trả lời câu hỏi',
      question_id: item.id,
    }));

    setListQuestion(dataQuestion || []);
  }, [dataAssignment, dataExam]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    draggable: false,
    slidesToShow: listQuestion.length < 15 ? listQuestion.length : 15,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const currentQuestion: any = useMemo(() => {
    if (typeof order === 'number') {
      return listQuestion[order - 1] || 'undefined';
    }
  }, [order, listQuestion]);

  return (
    <Spin spinning={loadingItem} delay={500}>
      <div className="Assignment">
        <div className="heading">
          <div className="heading__content">
            <div className="heading__content-name">
              <h3>{nameAssignment}</h3>
            </div>
            <div className="heading__content-mid">
              <div className="heading__content-timer">
                <Timer
                  setLoadingItem={setLoadingItem}
                  minutes={dataAssignment?.getAssignmentById.minuteDoing}
                />
              </div>
              <div className="heading__content-submit">
                <button>
                  {dataAssignment?.getAssignmentById.score?.toFixed(2)} Điểm
                </button>
              </div>
            </div>
          </div>
        </div>
        <main className="content">
          <div className="content__question">
            <AssignmentItem
              answerSubmit={
                dataAssignment?.getAssignmentById?.answerSubmit?.[order - 1]
                  ?.answer
              }
              correctAnswer={
                dataExam?.getExamById?.questions[order - 1]?.correctAnswer
              }
              order={order}
              question_id={currentQuestion?.question_id}
              name={currentQuestion?.name}
              content={currentQuestion?.content}
              answer={currentQuestion?.answer}
            />
          </div>
          <div className="content__answer">
            <div className="content__answer-list">
              <Slider {...settings}>
                {listQuestion.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => {
                          setOrder(index + 1);
                        }}
                        className={clsx(
                          'answer-item',
                          index + 1 === order && 'active'
                        )}
                      >
                        {index + 1}
                      </button>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </main>
      </div>
    </Spin>
  );
};
export default ReviewAssignment;
