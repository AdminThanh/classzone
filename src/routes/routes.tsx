// Layout
import StudentLayout from 'layouts/Student';
import TeacherLayout from 'layouts/Teacher';

// Pages
/* Student */
import StudentHome from 'pages/Student/Home';

/* Teacher */
import TeacherHome from 'pages/Teacher/Home';

import React, { ReactElement } from 'react';

export declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

type TRole = 'teacher' | 'student' | 'admin';

interface IRoute {
  path: string[] | string;
  element: () => ReactElement;
  role: TRole[];
  layout: () => ReactElement;
}

export const routes: IRoute[] = [
  /**
   * *********************************************
   * Teacher routes:
   */
  {
    path: ['/home'],
    element: StudentHome,
    role: ['teacher'],
    layout: TeacherLayout,
  },

  /**
   * **********************************************
   * Student routes:
   */
  {
    path: ['/home'],
    element: TeacherHome,
    role: ['student'],
    layout: StudentLayout,
  },
  /**
   * **********************************************
   * Admin routes:
   */
];
