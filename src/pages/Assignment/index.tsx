import { useMemo, useState, useEffect } from 'react';
import { CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper';
import AssignmentItem from './components/AssignmentItem';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { clsx } from 'clsx';
import './Assignment.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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
  answer: IAnswer[];
}
interface IAssignment {
  nameAssignment: string;
  start_time: string;
  end_time: string;
  assignment: IDataAssignment[];
}

interface IAnswers {
  [key: string]: string[];
}

const fakeAPIAssignment: Promise<IAssignment[]> = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      const dataAssignment: IAssignment[] = [
        {
          nameAssignment: 'Unit 1: Test Online',
          start_time: '2022-11-23T12:10:48.758+00:00',
          end_time: '2022-11-23T12:25:01.758+00:00',
          assignment: [
            {
              question_id: '101',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
              answer: [
                {
                  label: 'Lưu trữ dữ liệu',
                  value: 'Lưu trữ dữ liệu',
                },
                {
                  label: 'Chỉ đường cho người dùng (GPS)',
                  value: 'Chỉ đường cho người dùng (GPS)',
                },
                {
                  label: 'Hiển thị các địa điểm được yêu thích gần người dùng',
                  value: 'Hiển thị các địa điểm được yêu thích gần người dùng',
                },
                {
                  label: 'Cập nhật, lưu trữ thông tin về vị trí người dùng',
                  value: 'Cập nhật, lưu trữ thông tin về vị trí người dùng',
                },
              ],
            },
            {
              question_id: '102',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
              answer: [
                {
                  label: 'drag',
                  value: 'drag',
                },
                {
                  label: 'preventDefault ',
                  value: 'preventDefault ',
                },
                {
                  label: 'dataTransfer',
                  value: 'dataTransfer',
                },
                {
                  label: 'drop',
                  value: 'drop',
                },
              ],
            },
            {
              question_id: '103',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
              answer: [
                {
                  label: 'restore',
                  value: 'restore',
                },
                {
                  label: 'getImageData',
                  value: 'getImageData',
                },
                {
                  label: 'toDataURL',
                  value: 'toDataURL',
                },
                {
                  label: 'getContext ',
                  value: 'getContext ',
                },
              ],
            },
            {
              question_id: '104',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
              answer: [
                {
                  label: 'shadow',
                  value: 'shadow',
                },
                {
                  label: 'text-shadow ',
                  value: 'text-shadow ',
                },
                {
                  label: 'shadowed',
                  value: 'shadowed',
                },
                {
                  label: 'word-shadow',
                  value: 'word-shadow',
                },
              ],
            },
            {
              question_id: '105',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
              answer: [
                {
                  label: 'animation-delay:3s ',
                  value: 'animation-delay:3s ',
                },
                {
                  label: 'animation:3s;',
                  value: 'animation:3s;',
                },
                {
                  label: 'delay:3s;',
                  value: 'delay:3s;',
                },
                {
                  label: 'Tất cả đáp án trên đều sai',
                  value: 'Tất cả đáp án trên đều sai',
                },
              ],
            },
            {
              question_id: '106',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
              answer: [
                {
                  label: 'Lưu trữ dữ liệu',
                  value: 'Lưu trữ dữ liệu',
                },
                {
                  label: 'Chỉ đường cho người dùng (GPS)',
                  value: 'Chỉ đường cho người dùng (GPS)',
                },
                {
                  label: 'Hiển thị các địa điểm được yêu thích gần người dùng',
                  value: 'Hiển thị các địa điểm được yêu thích gần người dùng',
                },
                {
                  label: 'Cập nhật, lưu trữ thông tin về vị trí người dùng',
                  value: 'Cập nhật, lưu trữ thông tin về vị trí người dùng',
                },
              ],
            },
            {
              question_id: '107',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
              answer: [
                {
                  label: 'drag',
                  value: 'drag',
                },
                {
                  label: 'preventDefault ',
                  value: 'preventDefault ',
                },
                {
                  label: 'dataTransfer',
                  value: 'dataTransfer',
                },
                {
                  label: 'drop',
                  value: 'drop',
                },
              ],
            },
            {
              question_id: '108',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
              answer: [
                {
                  label: 'restore',
                  value: 'restore',
                },
                {
                  label: 'getImageData',
                  value: 'getImageData',
                },
                {
                  label: 'toDataURL',
                  value: 'toDataURL',
                },
                {
                  label: 'getContext ',
                  value: 'getContext ',
                },
              ],
            },
            {
              question_id: '109',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
              answer: [
                {
                  label: 'shadow',
                  value: 'shadow',
                },
                {
                  label: 'text-shadow ',
                  value: 'text-shadow ',
                },
                {
                  label: 'shadowed',
                  value: 'shadowed',
                },
                {
                  label: 'word-shadow',
                  value: 'word-shadow',
                },
              ],
            },
            {
              question_id: '1010',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
              answer: [
                {
                  label: 'animation-delay:3s ',
                  value: 'animation-delay:3s ',
                },
                {
                  label: 'animation:3s;',
                  value: 'animation:3s;',
                },
                {
                  label: 'delay:3s;',
                  value: 'delay:3s;',
                },
                {
                  label: 'Tất cả đáp án trên đều sai',
                  value: 'Tất cả đáp án trên đều sai',
                },
              ],
            },
            {
              question_id: '201',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
              answer: [
                {
                  label: '01 Lưu trữ dữ liệu',
                  value: '01 Lưu trữ dữ liệu',
                },
                {
                  label: '01 Chỉ đường cho người dùng (GPS)',
                  value: '01 Chỉ đường cho người dùng (GPS)',
                },
                {
                  label:
                    '01 Hiển thị các địa điểm được yêu thích gần người dùng',
                  value:
                    '01 Hiển thị các địa điểm được yêu thích gần người dùng',
                },
                {
                  label: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng',
                  value: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng',
                },
              ],
            },
            {
              question_id: '202',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
              answer: [
                {
                  label: '01 drag',
                  value: '01 drag',
                },
                {
                  label: '01 preventDefault ',
                  value: '01 preventDefault ',
                },
                {
                  label: '01 dataTransfer',
                  value: '01 dataTransfer',
                },
                {
                  label: '01 drop',
                  value: '01 drop',
                },
              ],
            },
            {
              question_id: '203',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
              answer: [
                {
                  label: '01 restore',
                  value: '01 restore',
                },
                {
                  label: '01 getImageData',
                  value: '01 getImageData',
                },
                {
                  label: '01 toDataURL',
                  value: '01 toDataURL',
                },
                {
                  label: '01 getContext ',
                  value: '01 getContext ',
                },
              ],
            },
            {
              question_id: '204',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
              answer: [
                {
                  label: '01 shadow',
                  value: '01 shadow',
                },
                {
                  label: '01 text-shadow ',
                  value: '01 text-shadow ',
                },
                {
                  label: '01 shadowed',
                  value: '01 shadowed',
                },
                {
                  label: '01 word-shadow',
                  value: '01 word-shadow',
                },
              ],
            },
            {
              question_id: '205',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
              answer: [
                {
                  label: '01 animation-delay:3s ',
                  value: '01 animation-delay:3s ',
                },
                {
                  label: '01 animation:3s;',
                  value: '01 animation:3s;',
                },
                {
                  label: '01 delay:3s;',
                  value: '01 delay:3s;',
                },
                {
                  label: '01 Tất cả đáp án trên đều sai',
                  value: '01 Tất cả đáp án trên đều sai',
                },
              ],
            },
            {
              question_id: '206',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
              answer: [
                {
                  label: '01 Lưu trữ dữ liệu',
                  value: '01 Lưu trữ dữ liệu',
                },
                {
                  label: '01 Chỉ đường cho người dùng (GPS)',
                  value: '01 Chỉ đường cho người dùng (GPS)',
                },
                {
                  label:
                    '01 Hiển thị các địa điểm được yêu thích gần người dùng',
                  value:
                    '01 Hiển thị các địa điểm được yêu thích gần người dùng',
                },
                {
                  label: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng',
                  value: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng',
                },
              ],
            },
            {
              question_id: '207',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
              answer: [
                {
                  label: '01 drag',
                  value: '01 drag',
                },
                {
                  label: '01 preventDefault ',
                  value: '01 preventDefault ',
                },
                {
                  label: '01 dataTransfer',
                  value: '01 dataTransfer',
                },
                {
                  label: '01 drop',
                  value: '01 drop',
                },
              ],
            },
            {
              question_id: '208',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
              answer: [
                {
                  label: '01 restore',
                  value: '01 restore',
                },
                {
                  label: '01 getImageData',
                  value: '01 getImageData',
                },
                {
                  label: '01 toDataURL',
                  value: '01 toDataURL',
                },
                {
                  label: '01 getContext ',
                  value: '01 getContext ',
                },
              ],
            },
            {
              question_id: '209',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
              answer: [
                {
                  label: '01 shadow',
                  value: '01 shadow',
                },
                {
                  label: '01 text-shadow ',
                  value: '01 text-shadow ',
                },
                {
                  label: '01 shadowed',
                  value: '01 shadowed',
                },
                {
                  label: '01 word-shadow',
                  value: '01 word-shadow',
                },
              ],
            },
            {
              question_id: '2010',
              name: 'Đọc đoạn văn sau và trả lời câu hỏi',
              content:
                'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
              answer: [
                {
                  label: '01 animation-delay:3s ',
                  value: '01 animation-delay:3s ',
                },
                {
                  label: '01 animation:3s;',
                  value: '01 animation:3s;',
                },
                {
                  label: '01 delay:3s;',
                  value: '01 delay:3s;',
                },
                {
                  label: '01 Tất cả đáp án trên đều sai',
                  value: '01 Tất cả đáp án trên đều sai',
                },
              ],
            },
          ],
        },
      ];
      resolve(dataAssignment);
    }, 1000);
  }
);

const dataSession = sessionStorage.getItem('dataAnswer') || 'undefined';

const Assignment = () => {
  const [listQuestion, setListQuestion] = useState<IDataAssignment[]>([]);
  const [nameAssignment, setNameAssignment] = useState('');
  const [dataAnswer, setDataAnswer] = useState<IAnswers>({});
  const [order, setOrder] = useState(1);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fakeAPIAssignment.then((res) => {
      setListQuestion(res[0].assignment);
      setNameAssignment(res[0].nameAssignment);

      setStartTime(res[0].start_time);
      setEndTime(res[0].end_time);
    });

    if (dataSession !== 'undefined') {
      setDataAnswer(JSON.parse(dataSession));
    }
  }, []);


  const currentQuestion: any = useMemo(() => {
    if (typeof order === 'number') {
      return listQuestion[order - 1] || 'undefined';
    }
  }, [order, listQuestion]);

  console.log(currentQuestion);

  const handleAnswered = (id: string, answered: any) => {
    setDataAnswer({
      ...dataAnswer,
      [id]: answered,
    });
    sessionStorage.setItem(
      'dataAnswer',
      JSON.stringify({
        ...dataAnswer,
        [id]: answered,
      })
    );
  };

  console.log('answers_submit: ', dataAnswer);

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
          console.log('answers_submit: ', dataAnswer);
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
      okText: 'Nộp bài',
      cancelText: 'Hủy',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  return (
    <div className="Assignment">
      <div className="heading">
        <div className="heading__content">
          <div className="heading__content-name">
            <h3>{nameAssignment}</h3>
          </div>
          <div className="heading__content-mid">
            <div className="heading__content-timer">
              <Timer startTime={startTime} endTime={endTime} />
            </div>
            <div className="heading__content-submit none_sm">
              <button onClick={handleSubmit}>
                <CheckCircleOutlined />
                Nộp bài
              </button>
            </div>
          </div>
          <div className="heading__content-out none_sm">
            <LogoutOutlined />
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
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
              spaceBetween={5}
              slidesPerGroup={4}
              navigation
              breakpoints={{
                576: {
                  width: 576,
                  slidesPerView: 5,
                },
                994: {
                  width: 768,
                  slidesPerView: 10,
                },
                1500: {
                  width: 1500,
                  slidesPerView: 15,
                },
              }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {listQuestion.map((item, index) => (
                <SwiperSlide>
                  <div
                    key={index}
                    onClick={() => {
                      setOrder(index + 1);
                    }}
                    className={clsx(
                      'answer-item',
                      dataAnswer[+item.question_id]?.length && 'chose',
                      index + 1 === order && 'active'
                    )}
                  >
                    {index + 1}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
  );
};
export default Assignment;
