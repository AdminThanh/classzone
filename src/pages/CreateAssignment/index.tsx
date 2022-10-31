import { useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
// import { ShowmoreIcon } from 'utils/drawer';
import QuestionItem from './components/QuestionItem';
import dragDropIcon from 'assets/images/icons/showmore.svg';
import './CreateAssignment.scss';

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
  const [dataQuestionList, setDataQuestionList] = useState<IQuestions[]>([]);
  const [listShowmoretBn, setListShowmoreBtn] = useState<IListShowmoreBtn>({});

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

  return (
    <div className="create-assignment">
      {/* Nav & Breadcrumb */}
      <div className="create-assignment__skin">
        <div className="create-assignment__add-button"></div>
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
                        // isDragDisabled={isReadonly}
                      >
                        {(provided, snapshot) => (
                          // <QuestionItem
                          //   ref={provided.innerRef}
                          //   key={item._id}
                          //   question={item.question}
                          //   order={item.order}
                          // />
                          // <div
                          //   ref={provided.innerRef}
                          //   {...provided.draggableProps}
                          //   {...provided.dragHandleProps}
                          //   className={`${
                          //     snapshot?.isDragging
                          //       ? 'dragDrop_item dragging'
                          //       : 'dragDrop_item'
                          //   }`}
                          // >
                          //   <img
                          //     // {...provided.dragHandleProps}
                          //     src={dragDropIcon}
                          //     alt="dragDropIcon"
                          //   />
                          //   sDASDSAd
                          // </div>

                          <QuestionItem
                            ref={provided.innerRef}
                            _id={item?._id}
                            question={item?.question}
                            order={item?.order}
                            keyRender={index}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            isShowmoreBtn={Boolean(
                              listShowmoretBn[item?._id]?.isShowmoreBtn
                            )}
                            isShowmore={Boolean(
                              listShowmoretBn[item?._id]?.isShowmore
                            )}
                            handleSetAShowmoreBtn={handleSetAShowmoreBtn}
                            handleSetAShowmore={handleSetAShowmore}
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
