// Layout
import AuthLayout from 'layouts/Auth';
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';
import EditProfile from 'pages/EditProfile/EditProfile';

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
import Login from 'pages/Login';
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
    path: '/classDetail',
    element: ClassDetail,
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
    path: '/register',
    element: Register,
    role: ['teacher'],
  },

  {
    path: '/login',
    element: Login,
    role: ['teacher'],
  },

  {
    path: '/edit-profile',
    element: EditProfile,
    role: ['teacher'],
    layout: TeacherLayout,
  },

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
