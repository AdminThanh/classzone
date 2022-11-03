import clsx from 'clsx';
import React from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { BinIcon, EditIcon, ShowmoreIcon, UpdateIcon } from 'utils/drawer';
import './QuestionItemDrag.scss';

interface IQuestionItem {
  _id: string;
  question: string;
  order: number;
  keyRender: number;

  // react-beautiful-dnd
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;

  // Action
}

const QuestionItem = forwardRef<HTMLDivElement, IQuestionItem>((props, ref) => {
  const {
    _id,
    order,
    question,
    keyRender,
    draggableProps,
    dragHandleProps,
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

  const handleDeleteQuestion = (e: React.MouseEvent<SVGElement>) => {
    const id = e.currentTarget?.dataset.id;
    console.log(id)
  }

  return (
    <div className="questionItem-drag" ref={ref} {...draggableProps}>
      <div className="questionItem-drag__skin" >
        <div className="questionItem-drag__label-wrapper">
          <div className="questionItem-drag__drag-icon" {...dragHandleProps}>
            <ShowmoreIcon></ShowmoreIcon>
          </div>
          <div className="questionItem-drag__label">Câu hỏi {order}</div>
        </div>
        <div className="questionItem-drag__content">
          <div ref={questionRef} className={'questionItem-drag__question'}>
            {question}
          </div>
        </div>
        <div className="questionItem-drag__action">
          <UpdateIcon data-id={_id}  />

          <BinIcon data-id={_id} onClick={handleDeleteQuestion} />
        </div>
      </div>
    </div>
  );
});

export default React.memo(QuestionItem);
