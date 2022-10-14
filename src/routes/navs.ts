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
    path: '/classes',
  },
  {
    label: 'test_management',
    icon: TestIcon,
    path: '/',
  },
  {
    label: 'question_management',
    icon: QuestionIcon,                                                                                                                                                                  
    path: '/',
  },
];
