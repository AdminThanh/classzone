import {
  CheckCircleOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, notification, Spin } from 'antd';
import { clsx } from 'clsx';
import {
  GetAssignmentByIdDocument,
  GetExamClassByIdDocument,
  UpdateAssignmentDocument,
} from 'gql/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { NextIcon, PrevIcon } from 'utils/drawer';
// import NextIcon from '../../assets/images/nextIcon.svg';
// import PrevIcon from '../../assets/images/prevIcon.svg';
import './Assignment.scss';
import AssignmentItem from './components/AssignmentItem';
import Timer from './components/Timer';

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
interface IAssignment {
  nameAssignment: string;
  start_time: any;
  end_time: any;
  assignment: IDataAssignment[];
}

interface IAnswers {
  [key: string]: string[];
}

const dataSession = sessionStorage.getItem('dataAnswer') || 'undefined';

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

const Assignment = () => {
  const [listQuestion, setListQuestion] = useState<IDataAssignment[]>([]);
  const [nameAssignment, setNameAssignment] = useState('');
  const [dataAnswer, setDataAnswer] = useState<IAnswers>({});
  const [order, setOrder] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [loadingItem, setLoadingItem] = useState(false);
  const { t } = useTranslation();
  const { examClassId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [fireUpdateAssignment] = useMutation(UpdateAssignmentDocument);

  const { data: getAssignmentById } = useQuery(GetAssignmentByIdDocument, {
    variables: {
      id: assignmentId as string,
    },
  });

  const { data } = useQuery(GetExamClassByIdDocument, {
    variables: {
      id: examClassId as string,
    },
  });

  useEffect(() => {
    setNameAssignment(data?.getExamClassById?.exam.name as string);

    const dataQuestion = data?.getExamClassById.exam.questions.map((item) => ({
      content: item.question,
      answer: item.answers,
      name: 'Đọc đoạn văn sau và trả lời câu hỏi',
      question_id: item.id,
    }));
    setListQuestion(dataQuestion || []);
    const timer =
      (+new Date() -
        +new Date(getAssignmentById?.getAssignmentById.startTime)) /
      1000;

    const timeRemaining = (
      Number(data?.getExamClassById?.minutes) * 60 -
      timer
    ).toFixed();

    setMinutes(Number(timeRemaining));
  }, [data, getAssignmentById]);

  useEffect(() => {
    if (dataSession !== 'undefined') {
      setDataAnswer(JSON.parse(dataSession));
    }
  }, []);

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

  const handleAnswered = (id: string, answered: any) => {
    setDataAnswer({
      ...dataAnswer,
      [id]: answered,
    });
    console.log('dataAnswer',dataAnswer);
    
    sessionStorage.setItem(
      'dataAnswer',
      JSON.stringify({
        ...dataAnswer,
        [id]: answered,
      })
    );
  };

  const handleSubmitAsignmentAuto = async () => {
    const answerSubmit = listQuestion.map((item) => ({
      questionId: item.question_id,
      answer: dataAnswer[item.question_id] || [],
    }));
    const timeDoing = (
      (+new Date() -
        +new Date(getAssignmentById?.getAssignmentById.startTime)) /
      1000
    ).toFixed();
    
    console.log('listQuestion',listQuestion);
    console.log('answerSubmit',answerSubmit);
    console.log('dataAnswer',dataAnswer);
    

    try {
      await fireUpdateAssignment({
        variables: {
          updateAssignmentInput: {
            examClass: examClassId,
            answerSubmit: answerSubmit,
            startTime: getAssignmentById?.getAssignmentById.startTime,
            minuteDoing: Number(timeDoing),
          },
          id: getAssignmentById?.getAssignmentById.id as string,
        },
      });

      setTimeout(() => {
        notification.success({
          key: 'success',
          message: 'Nộp bài Thành công',
        });
        sessionStorage.removeItem('dataAnswer');
        navigate('/assignments');
      }, 1500);
    } catch (error) {
      notification.error({
        key: 'error',
        message: 'Nộp bài thất bại',
      });
    }
  };

  const handleSubmit = () => {
    confirm({
      title: 'Bạn có chắc chắn muốn nộp bài!',
      icon: <ExclamationCircleFilled />,
      content:
        'Lưu ý: Khi nộp bài, đáp án của bạn sẽ được gửi đi và bạn sẽ không thể làm lại bài này nữa!',
      okText: 'Nộp bài',
      cancelText: 'Hủy',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
          setTimeout(() => {
            setLoadingItem(true);
            handleSubmitAsignmentAuto();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  const handleCancel = () => {
    confirm({
      title: 'Bạn có chắc chắn hủy bài làm!',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Khi hủy bài làm, bạn sẽ không thể làm lại bài này nữa!',
      okText: 'Không làm nữa',
      cancelText: 'Hủy',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
          setTimeout(() => {
            navigate('/assignments');
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };
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
                  handleSubmitAsignmentAuto={handleSubmitAsignmentAuto}
                  minutes={minutes}
                />
              </div>
              <div className="heading__content-submit none_sm">
                <button onClick={handleSubmit}>
                  <CheckCircleOutlined />
                  Nộp bài
                </button>
              </div>
            </div>
            <div className="heading__content-out none_sm">
              <LogoutOutlined onClick={handleCancel} />
            </div>
          </div>
        </div>
        <main className="content">
          <div className="content__question">
            <AssignmentItem
              dataAnswer={dataAnswer}
              handleAnswered={handleAnswered}
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
                          dataAnswer[item.question_id]?.length && 'chose',
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
            <div className="heading__content-footer">
              <div className="heading__content-out block_sm">
                <button onClick={handleCancel}>
                  <LogoutOutlined />
                  Thoát
                </button>
              </div>
              <div className="heading__content-submit block_sm">
                <button onClick={handleSubmit}>
                  <CheckCircleOutlined />
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Spin>
  );
};
export default Assignment;
