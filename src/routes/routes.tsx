// Layout
import AuthLayout from 'layouts/Auth';
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';

// Pages
/* General */
import ClassDetail from 'pages/ClassDetail';
import TeacherHome from 'pages/Home';
import TeacherClasses from 'pages/Classes';
import Home from 'pages/Home';

/* Student */
import StudentHome from 'pages/Student/Home';

/* Teacher */

import React, { ReactElement } from 'react';
import AuthPage from 'pages/AuthPage';
import Login from 'pages/Login';
import Question from 'pages/Question';
import Register from 'pages/Register';

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
    path: '/class_detail',
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
