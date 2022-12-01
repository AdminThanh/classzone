// Layout
import TeacherLayout from 'layouts/Teacher';

// Pages
/* General */
import Home from 'pages/Home';

/* Student */

/* Teacher */
import WheelOfNames from 'components/WheelOfNames';
import AuthLayout from 'layouts/Auth';
import ErrorPage from 'pages/404Page';
import ClassDetail from 'pages/ClassDetail';
import Classes from 'pages/Classes';
import CreateAssignment from 'pages/CreateAssignment';
import CreateQuession from 'pages/CreateQuession';
import EditProfile from 'pages/EditProfile';
import Login from 'pages/Login';
import Question from 'pages/Question';
import Register from 'pages/Register';
import Attendance from 'pages/Teacher/Attendance';
import TableScore from 'pages/Teacher/TableScore';
import { FunctionComponent } from 'react';
import AuthPage from 'pages/AuthPage';
import ExamPage from 'pages/ExamPage';
import ExamManagement from 'pages/ExamManagement';
import StudentLayout from 'layouts/Student';
import Assignment from 'pages/Assignment';
import JoinClass from 'pages/ClassDetail/components/JoinClass';
import CreateAttendance from 'pages/CreateAttendance';

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
    role: ['teacher', "student"],
    layout: TeacherLayout,
  },
  {
    path: '/create_assignment',
    element: CreateAssignment,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/exam_management/:examId',
    element: CreateAssignment,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/class_detail/:classId',
    element: ClassDetail,
    role: ['teacher', 'student'],
    layout: TeacherLayout,
  },
  {
    path: '/class_detail/:classId/table_score',
    element: TableScore,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    // path: '/join_cLass/:classId/:studentId',
    path: '/join_class/:classId',
    element: JoinClass,
    role: ['teacher'],
    // layout: TeacherLayout,
  },
  {
    path: '/class_detail/:classId/attendance',
    element: Attendance,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/class_detail/:classId/schedule',
    element: CreateAttendance,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  // {
  //   path: '/login',
  //   element: Login,
  //   layout: AuthLayout,
  // },
  // {
  //   path: '/register',
  //   element: Register,
  //   layout: AuthLayout,
  // },
  {
    path: '/home',
    element: Home,
    role: ['teacher'],
    layout: TeacherLayout,
  },

  {
    path: '/profile',
    element: EditProfile,
    role: ['teacher', 'student'],
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
  {
    path: '/question/:questionId',
    element: CreateQuession,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/exam_management',
    element: ExamManagement,
    role: ['teacher'],
    layout: TeacherLayout,
  },

  /**
   * **********************************************
   * Student routes:
   */
  {
    path: '/assignment',
    element: ExamPage,
    role: ['student'],
    layout: TeacherLayout,
  },
  {
    path: '/assignment',
    element: Assignment,
    role: ['student'],
    layout: StudentLayout,
  },
  /**
   * **********************************************
   * Admin routes:
   */
];
