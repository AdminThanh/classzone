import clsx from 'clsx';
import React from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { BinIcon, EditIcon, ShowmoreIcon } from 'utils/drawer';
import './QuestionItemDrag.scss';

interface IQuestionItem {
  _id: string;
  question: string;
  order: number;
  keyRender: number;
  isShowmoreBtn: boolean;
  isShowmore: boolean;

  // react-beautiful-dnd
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;

  // Action
  handleSetAShowmoreBtn: (_id: string, state: boolean) => void;
  handleSetAShowmore: (_id: string, state: boolean) => void;
}

const QuestionItem = forwardRef<HTMLDivElement, IQuestionItem>((props, ref) => {
  const {
    _id,
    order,
    question,
    keyRender,
    isShowmore,
    isShowmoreBtn,
    draggableProps,
    dragHandleProps,
    handleSetAShowmore,
    handleSetAShowmoreBtn,
    ...rest
  } = props;

  const questionRef = useRef<HTMLDivElement>(null);
  //   useLayoutEffect(() => {
  //     if (
  //       Number(questionRef.current?.clientHeight) <
  //       Number(questionRef.current?.scrollHeight)
  //     )
  //       setIsShowAction(true);

  //     console.log('keyRender change', keyRender);
  //     return () => {};
  //   }, [keyRender]);

  console.log("isShowmoreBtn", isShowmoreBtn)

  useLayoutEffect(() => {
    if (
      Number(questionRef.current?.clientHeight) <
      Number(questionRef.current?.scrollHeight)
    ) {
      handleSetAShowmoreBtn(_id, true);
    }

    console.log('Chạy lại', _id);
  }, []);

  const handleToggleShowMore = (state: boolean) => {
    if (state) {
      handleSetAShowmore(_id, false);
    } else {
      handleSetAShowmore(_id, true);
    }
  };

  return (
    <div className="questionItem-drag" ref={ref} {...draggableProps}>
      <div className="questionItem-drag__label-wrapper">
        <div className="questionItem-drag__drag-icon" {...dragHandleProps}>
          <ShowmoreIcon></ShowmoreIcon>
        </div>
        <div className="questionItem-drag__label">Câu hỏi {order}</div>
      </div>
      <div className="questionItem-drag__content">
        <div
          ref={questionRef}
          className={clsx('questionItem-drag__question', {
            'questionItem-drag__question--showmore': isShowmore,
          })}
        >
          {question}
        </div>
        {isShowmoreBtn && (
          <div
            onClick={() => handleToggleShowMore(isShowmore)}
            className="questionItem-drag__showmore"
          >
            {isShowmore ? 'Ẩn bớt' : 'Hiện thêm'}
          </div>
        )}
      </div>
      <div className="questionItem-drag__action">
        <EditIcon />

        <BinIcon />
      </div>
    </div>
  );
});

export default React.memo(QuestionItem);
