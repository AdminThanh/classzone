import './StudentGroup.scss';
import { Avatar, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useMemo, useState } from 'react';

const StudentGroup = (props: any) => {
  const { name, avatar, id } = props;
  const [dataAnswer, setDataAnswer] = useState({});

  const onChange = (e: CheckboxChangeEvent) => {
    console.log([e.target.value]);
  };

  return (
    <div className="StudentGroup">
      <Checkbox value={id} onChange={onChange}>
        <div>
          <div className="student-item">
            <Avatar src={avatar}>{name.charAt(0).toUpperCase()}</Avatar>
            <div className="name">
              <a>{name}</a>
            </div>
          </div>
        </div>
      </Checkbox>
    </div>
  );
};
export default StudentGroup;
