// Layout
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';

// Pages
/* General */
import Home from 'pages/Home';

/* Student */
import StudentHome from 'pages/Student/Home';

/* Teacher */
import Attendance from 'pages/Teacher/Attendance';
import { ReactElement } from 'react';
import WheelOfNames from 'components/WheelOfNames';
import Login from 'pages/Login';
import Question from 'pages/Question';
import CreateQuestion from 'pages/CreateQuestion';
import Register from 'pages/Register';
import TableScore from 'pages/Teacher/TableScore';
import { FunctionComponent } from 'react';
import AuthPage from 'pages/AuthPage';
import AuthLayout from 'layouts/Auth';
import ClassDetail from 'pages/ClassDetail';
import EditProfile from 'pages/EditProfile';
import Classes from 'pages/Classes';
import ErrorPage from 'pages/404Page';
<<<<<<< HEAD
import ExamPage from 'pages/ExamPage';
=======
import CreateQuession from 'pages/CreateQuession';
>>>>>>> 1950be19b485f9e23d99507e04753a2b390b5fea

export declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

type TRole = 'teacher' | 'student' | 'admin';
interface IRoute {
  path: string;
  element: FunctionComponent<any>;
  role?: TRole[];
  layout?: FunctionComponent<any>;
}
export const routes: IRoute[] = [
  /**
   * *********************************************
   * Teacher routes:
   */
  {
    path: '/',
    element: Classes,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/table_score',
    element: TableScore,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/wheel',
    element: WheelOfNames,
    role: ['teacher'],
  },
  {
    path: '/error',
    element: ErrorPage,
    role: ['teacher'],
  },
  {
    path: '/class_detail',
    element: ClassDetail,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/attendance',
    element: Attendance,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/exam',
    element: ExamPage,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/login',
    element: Login,
    role: ['teacher'],
    layout: AuthLayout,
  },
  {
    path: '/register',
    element: Register,
    role: ['teacher'],
    layout: AuthLayout,
  },
  {
    path: '/home',
    element: Home,
    role: ['teacher'],
    layout: TeacherLayout,
  },

  {
    path: '/profile',
    element: EditProfile,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/create_question',
    element: CreateQuession,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/question',
    element: Question,
    role: ['teacher'],
    layout: TeacherLayout,
  },

  /**
   * **********************************************
   * Student routes:
   */
  // {
  //   path: '/',
  //   element: StudentHome,
  //   role: ['student'],
  //   layout: StudentLayout,
  // },
  /**
   * **********************************************
   * Admin routes:
   */
];
