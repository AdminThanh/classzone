import { useMemo, useState, useEffect } from 'react';
import { CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper';
import AssignmentItem from './components/AssignmentItem';
import { clsx } from 'clsx';
import './Assignment.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IAnswer {
    label: string;
}

interface IDataAssignment {
    question_id: string;
    name: string;
    content: string;
    answer: IAnswer[];
}

interface IAssignment {
    nameAssignment: string;
    assignment: IDataAssignment[];
}


const fakeAPIAssignment: Promise<IAssignment[]> = new Promise((resolve, reject) => {
    setTimeout(() => {
        const dataAssignment: IAssignment[] = [
            {
                nameAssignment: 'Unit 1: Test Online',
                assignment: [
                    {
                        question_id: '101',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
                        answer: [
                            {
                                label: 'Lưu trữ dữ liệu'
                            },
                            {
                                label: 'Chỉ đường cho người dùng (GPS)'
                            },
                            {
                                label: 'Hiển thị các địa điểm được yêu thích gần người dùng'
                            },
                            {
                                label: 'Cập nhật, lưu trữ thông tin về vị trí người dùng'
                            },
                        ],
                    },
                    {
                        question_id: '102',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
                        answer: [
                            {
                                label: 'drag'
                            },
                            {
                                label: 'preventDefault '
                            },
                            {
                                label: 'dataTransfer'
                            },
                            {
                                label: 'drop'
                            },
                        ],
                    },
                    {
                        question_id: '103',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
                        answer: [
                            {
                                label: 'restore'
                            },
                            {
                                label: 'getImageData'
                            },
                            {
                                label: 'toDataURL'
                            },
                            {
                                label: 'getContext '
                            },
                        ],
                    },
                    {
                        question_id: '104',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
                        answer: [
                            {
                                label: 'shadow'
                            },
                            {
                                label: 'text-shadow '
                            },
                            {
                                label: 'shadowed'
                            },
                            {
                                label: 'word-shadow'
                            },
                        ],
                    },
                    {
                        question_id: '105',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
                        answer: [
                            {
                                label: 'animation-delay:3s '
                            },
                            {
                                label: 'animation:3s;'
                            },
                            {
                                label: 'delay:3s;'
                            },
                            {
                                label: 'Tất cả đáp án trên đều sai'
                            },
                        ],
                    },
                    {
                        question_id: '106',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
                        answer: [
                            {
                                label: 'Lưu trữ dữ liệu'
                            },
                            {
                                label: 'Chỉ đường cho người dùng (GPS)'
                            },
                            {
                                label: 'Hiển thị các địa điểm được yêu thích gần người dùng'
                            },
                            {
                                label: 'Cập nhật, lưu trữ thông tin về vị trí người dùng'
                            },
                        ],
                    },
                    {
                        question_id: '107',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
                        answer: [
                            {
                                label: 'drag'
                            },
                            {
                                label: 'preventDefault '
                            },
                            {
                                label: 'dataTransfer'
                            },
                            {
                                label: 'drop'
                            },
                        ],
                    },
                    {
                        question_id: '108',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
                        answer: [
                            {
                                label: 'restore'
                            },
                            {
                                label: 'getImageData'
                            },
                            {
                                label: 'toDataURL'
                            },
                            {
                                label: 'getContext '
                            },
                        ],
                    },
                    {
                        question_id: '109',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
                        answer: [
                            {
                                label: 'shadow'
                            },
                            {
                                label: 'text-shadow '
                            },
                            {
                                label: 'shadowed'
                            },
                            {
                                label: 'word-shadow'
                            },
                        ],
                    },
                    {
                        question_id: '1010',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
                        answer: [
                            {
                                label: 'animation-delay:3s '
                            },
                            {
                                label: 'animation:3s;'
                            },
                            {
                                label: 'delay:3s;'
                            },
                            {
                                label: 'Tất cả đáp án trên đều sai'
                            },
                        ],
                    },
                    {
                        question_id: '201',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
                        answer: [
                            {
                                label: '01 Lưu trữ dữ liệu'
                            },
                            {
                                label: '01 Chỉ đường cho người dùng (GPS)'
                            },
                            {
                                label: '01 Hiển thị các địa điểm được yêu thích gần người dùng'
                            },
                            {
                                label: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng'
                            },
                        ],
                    },
                    {
                        question_id: '202',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
                        answer: [
                            {
                                label: '01 drag'
                            },
                            {
                                label: '01 preventDefault '
                            },
                            {
                                label: '01 dataTransfer'
                            },
                            {
                                label: '01 drop'
                            },
                        ],
                    },
                    {
                        question_id: '203',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
                        answer: [
                            {
                                label: '01 restore'
                            },
                            {
                                label: '01 getImageData'
                            },
                            {
                                label: '01 toDataURL'
                            },
                            {
                                label: '01 getContext '
                            },
                        ],
                    },
                    {
                        question_id: '204',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
                        answer: [
                            {
                                label: '01 shadow'
                            },
                            {
                                label: '01 text-shadow '
                            },
                            {
                                label: '01 shadowed'
                            },
                            {
                                label: '01 word-shadow'
                            },
                        ],
                    },
                    {
                        question_id: '205',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
                        answer: [
                            {
                                label: '01 animation-delay:3s '
                            },
                            {
                                label: '01 animation:3s;'
                            },
                            {
                                label: '01 delay:3s;'
                            },
                            {
                                label: '01 Tất cả đáp án trên đều sai'
                            },
                        ],
                    },
                    {
                        question_id: '206',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Ngoài việc hiển thị vị trí người dùng trên bản đồ, bạn có thể sử dụng Geolocation để làm gì?',
                        answer: [
                            {
                                label: '01 Lưu trữ dữ liệu'
                            },
                            {
                                label: '01 Chỉ đường cho người dùng (GPS)'
                            },
                            {
                                label: '01 Hiển thị các địa điểm được yêu thích gần người dùng'
                            },
                            {
                                label: '01 Cập nhật, lưu trữ thông tin về vị trí người dùng'
                            },
                        ],
                    },
                    {
                        question_id: '207',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Phương thức nào được gọi để chặn các tính năng xử lý mặc định của trình duyệt với dữ liệu',
                        answer: [
                            {
                                label: '01 drag'
                            },
                            {
                                label: '01 preventDefault '
                            },
                            {
                                label: '01 dataTransfer'
                            },
                            {
                                label: '01 drop'
                            },
                        ],
                    },
                    {
                        question_id: '208',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Để sử dụng canvas, ta cần phải sử dụng phương thức ____ để truy cập toàn bộ đến hàm và thuộc tính của canvas.',
                        answer: [
                            {
                                label: '01 restore'
                            },
                            {
                                label: '01 getImageData'
                            },
                            {
                                label: '01 toDataURL'
                            },
                            {
                                label: '01 getContext '
                            },
                        ],
                    },
                    {
                        question_id: '209',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây áp dụng một hoặc nhiều bóng cho văn bản?',
                        answer: [
                            {
                                label: '01 shadow'
                            },
                            {
                                label: '01 text-shadow '
                            },
                            {
                                label: '01 shadowed'
                            },
                            {
                                label: '01 word-shadow'
                            },
                        ],
                    },
                    {
                        question_id: '2010',
                        name: 'Đọc đoạn văn sau và trả lời câu hỏi',
                        content: 'Thuộc tính nào sau đây bắt đầu chạy animation sau vài giây?',
                        answer: [
                            {
                                label: '01 animation-delay:3s '
                            },
                            {
                                label: '01 animation:3s;'
                            },
                            {
                                label: '01 delay:3s;'
                            },
                            {
                                label: '01 Tất cả đáp án trên đều sai'
                            },
                        ],
                    },
                ]
            }

        ]
        resolve(dataAssignment);
    }, 1000)
});

const Assignment = () => {

    const [listQuestion, setListQuestion] = useState<IDataAssignment[]>([]);
    const [nameAssignment, setNameAssignment] = useState('');
    const [dataAnswer, setDataAnswer] = useState<IAssignment[]>([]);
    const [order, setOrder] = useState(0);

    useEffect(() => {
        fakeAPIAssignment.then((res) => {
            setListQuestion(res[0].assignment);
            setNameAssignment(res[0].nameAssignment);
        });
       
        // setInterval(() => {
        //         console.log('121');
                
        // }, 1000)

    }, []);

    const currentQuestion: any = useMemo(() => {
        if (typeof order === "number") {
            return listQuestion[order] || 'undefined';
        }
    }, [order, listQuestion])

    console.log('answers_submit: ', dataAnswer);

    const handleAnswered = (id: string, answered: any) => {
        setDataAnswer({
            ...dataAnswer,
            [id]: answered
        })
    }

    return (
        <div className='Assignment'>
            <div className="heading">
                <div className="heading__content">
                    <div className="heading__content-name">
                        <h3>{nameAssignment}</h3>
                    </div>
                    <div className="heading__content-mid">
                        <div className="heading__content-timer">
                            <span>32</span> <b>:</b> <span>51</span>
                        </div>
                        <div className="heading__content-submit">
                            <button><CheckCircleOutlined />Nộp bài</button>
                        </div>
                    </div>
                    <div className="heading__content-out">
                        <LogoutOutlined />
                    </div >
                </div>
            </div >
            <main className='content'>
                <div className="content__question">
                    <AssignmentItem handleAnswered={handleAnswered} order={order + 1} question_id={currentQuestion?.question_id} name={currentQuestion?.name} content={currentQuestion?.content} answer={currentQuestion?.answer} />
                </div>
                <div className="content__answer">
                    <div className="content__answer-list">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
                            spaceBetween={5}
                            slidesPerGroup={1}
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
                            {
                                listQuestion.map((_, index) => <SwiperSlide><div key={index} onClick={() => { setOrder(index) }} className={clsx('answer-item', index === order && 'chose active')}>{index + 1}</div></SwiperSlide>
                                )
                            }
                        </Swiper>

                    </div>
                </div>
            </main >
        </div >
    )
}
export default Assignment;