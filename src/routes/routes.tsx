// Layout
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';
import AuthPage from 'pages/AuthPage/AuthPage';

// Pages
/* Student */
import StudentHome from 'pages/Student/Home';

/* Teacher */
import TeacherHome from 'pages/Teacher/Home';
import TeacherClasses from 'pages/Teacher/Classes';

import ClassDetail from 'pages/Teacher/ClassDetail/Index';

import React, { ReactElement } from 'react';

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
    path: '/',
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
    path: '/login',
    element: AuthPage,
    role: ['teacher'],
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
