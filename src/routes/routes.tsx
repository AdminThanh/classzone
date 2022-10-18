// Layout
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';

// Pages
/* General */
import AuthPage from 'pages/AuthPage';


/* Student */
import StudentHome from 'pages/Student/Home';

/* Teacher */

import React, { ReactElement } from 'react';
import Home from 'pages/Home';
import ClassDetail from 'pages/ClassDetail';
import TeacherClasses from 'pages/Classes';
import Question from 'pages/Question'


export declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

type TRole = 'teacher' | 'student' | 'admin';
interface IRoute {
  path: string;
  element: (props: any) => ReactElement;
  role?: TRole[];
  layout?: (props: any) => ReactElement;
}

export const routes: IRoute[] = [
  /**
   * *********************************************
   * Teacher routes:
   */
  {
    path: '/classes',
    element: TeacherClasses,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  {
    path: '/classDetail',
    element: ClassDetail,
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
    path: '/login',
    element: AuthPage,
  },
  {
    path: '/home',
    element: Home,
    role: ['teacher'],
    layout: TeacherLayout,
  },
  // {
  //   path: '/register',
  //   element: Login,
  //   role: ['teacher'],
  // },

  /**
   * **********************************************
   * Student routes:
   */
  {
    path: '/',
    element: StudentHome,
    role: ['student'],
    layout: StudentLayout,
  },
  /**
   * **********************************************
   * Admin routes:
   */
];
