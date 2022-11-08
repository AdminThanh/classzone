import { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
// import { ShowmoreIcon } from 'utils/drawer';
import BreadCrumb from 'components/BreadCrumb';
import QuestionItem from './components/QuestionItem';
import './CreateAssignment.scss';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import FilterTags, { IOptionTag } from 'components/FilterTags';
import { useForm } from 'antd/es/form/Form';
import Button from 'components/Button';

const fakeAPI: Promise<IQuestions[]> = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        _id: '_asdksaodksao',
        order: 1,
        question:
          ' Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả. Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
      },
      {
        _id: '_asdksaodksaos',
        order: 2,
        question:
          ' Bố mẹ mình mỗi người một ngả. Đó là chuyện của người lớn. Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
      },
      {
        _id: '_asdksaodksaoss',
        order: 3,
        question:
          ' Mình sống với bà ngoại từ lúc ba tuổi đến giờ. Trong cuộc đời mình bà là người mình kính trọng nhất. Bà nuôi nấng dạy dỗ. Thúy Hiền ơi! Cậu là người hiểu mình hơn cả.',
      },
    ]);
  });
});

interface IQuestions {
  _id: string;
  order: number;
  question: string;
}

interface IListShowmoreBtn {
  [key: string]: { isShowmoreBtn: boolean; isShowmore: boolean };
}

const CreateAssignment = () => {
  const { t } = useTranslation();
  const [dataQuestionList, setDataQuestionList] = useState<IQuestions[]>([]);
  const [listShowmoretBn, setListShowmoreBtn] = useState<IListShowmoreBtn>({});
  const [form] = useForm();

  console.log(listShowmoretBn);

  useEffect(() => {
    fakeAPI.then((res) => {
      setDataQuestionList(res);
    });
  }, []);

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const reorder = (
      list: IQuestions[],
      startIndex: number,
      endIndex: number
    ) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    if (!result.destination) {
      return;
    }

    const items = reorder(
      dataQuestionList,
      result.source.index,
      result.destination.index
    );

    setDataQuestionList([...items]);
  };

  const handleSetAShowmoreBtn = (_id: string, state: boolean) => {
    setListShowmoreBtn({
      ...listShowmoretBn,
      [_id]: {
        ...listShowmoretBn[_id],
        isShowmoreBtn: state,
      },
    });
  };

  const handleSetAShowmore = (_id: string, state: boolean) => {
    setListShowmoreBtn({
      ...listShowmoretBn,
      [_id]: {
        ...listShowmoretBn[_id],
        isShowmore: state,
      },
    });
  };

  const tagOpts: IOptionTag[] = useMemo(
    () => [
      {
        label: 'Tiếng Anh',
        value: '1',
      },
      {
        label: 'Tiếng Đức',
        value: '2',
      },
    ],
    []
  );

  return (
    <div className="create-assignment">
      {/* Nav & Breadcrumb */}
      <button onClick={() => console.log(form.getFieldsValue())}>
        Hiện thị
      </button>
      <div className="create-assignment__skin">
        <div className="create-assignment__add-button"></div>
        <div className="create-assignment__header">
          <BreadCrumb
            routes={[
              {
                name: 'Tạo bài kiểm tra',
                path: '/create_assignment',
              },
            ]}
          />
          <Form form={form}>
            <div className="create-assignment__control-panel">
              <Form.Item
                name="asssignment_name"
                label={t('create_assignment.assignment_name')}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item name="tags" label={t('create_assignment.tag')}>
                <FilterTags opts={tagOpts} />
              </Form.Item>
            </div>
          </Form>
          <Button title={t('create_assignment.add_question')} type="primary" />
        </div>
        <div className="create-assignment__questions-skin">
          <div className="create-assignment__question-list">
            <DragDropContext
              onDragEnd={handleDragEnd}
              // onDragStart={handleDragStart}
              // onDragUpdate={handleDragUpdate}
            >
              <Droppable droppableId="orders">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="dragDrop_list"
                  >
                    {dataQuestionList?.map((item: any, index: any) => (
                      <Draggable
                        key={`question-${index}`}
                        draggableId={`question-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <QuestionItem
                            ref={provided.innerRef}
                            _id={item?._id}
                            question={item?.question}
                            order={index + 1}
                            keyRender={index}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
