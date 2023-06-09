import { BookOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import { ClassIcon, QuestionIcon, TestIcon } from 'utils/drawer';

export interface INavItem {
  label: string;
  path: string;
  icon: React.FC<any>;
}

export const TeacherRoutes: INavItem[] = [
  {
    label: 'my_class',
    icon: ClassIcon,
    path: '/',
  },
  {
    label: 'test_management',
    icon: TestIcon,
    path: '/exam_management',
  },
  {
    label: 'question_management',
    icon: QuestionIcon,
    path: '/question',
  },
];

export const StudentRoutes: INavItem[] = [
  {
    label: 'my_class',
    icon: ClassIcon,
    path: '/',
  },
  {
    label: 'assignment',
    icon: TestIcon,
    path: '/assignments',
  },
  // {
  //   label: 'test_management',
  //   icon: TestIcon,
  //   path: '/exam_management',
  // },
  // {
  //   label: 'question_management',
  //   icon: QuestionIcon,
  //   path: '/question',
  // },
];
