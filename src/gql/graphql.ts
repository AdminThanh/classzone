/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AnswerInput = {
  result: Scalars['Boolean'];
  text: Scalars['String'];
};

export type AnswerSubmitInput = {
  answer: Array<Scalars['String']>;
  questionId: Scalars['String'];
};

export type AnswerSubmitType = {
  __typename?: 'AnswerSubmitType';
  answer: Array<Scalars['String']>;
  questionId: Scalars['String'];
};

export type AnswerType = {
  __typename?: 'AnswerType';
  result: Scalars['Boolean'];
  text: Scalars['String'];
};

export type AssignUserToClassInput = {
  classId: Scalars['ID'];
  usersIds: Array<Scalars['ID']>;
};

export type AssignmentType = {
  __typename?: 'AssignmentType';
  _id: Scalars['ID'];
  answerSubmit?: Maybe<Array<AnswerSubmitType>>;
  createdAt: Scalars['DateTime'];
  examClass: ExamClassType;
  id: Scalars['String'];
  minuteDoing?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
  startTime: Scalars['DateTime'];
  status?: Maybe<Status>;
  student: User;
  updatedAt: Scalars['DateTime'];
};

export type Attendance = {
  __typename?: 'Attendance';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  is_present: Scalars['Boolean'];
  note: Scalars['String'];
  schedule?: Maybe<ScheduleType>;
  schedule_id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type AttendanceClassInput = {
  Attendance?: InputMaybe<Array<CreateAttendanceInput>>;
};

export type Class = {
  __typename?: 'Class';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  from_date: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  scoreFactor: Scalars['Float'];
  studentAmount: Scalars['Float'];
  students?: Maybe<Array<User>>;
  teachers?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
};

export enum ClassSortType {
  EndDate = 'END_DATE',
  FromDate = 'FROM_DATE'
}

export enum ClassStatus {
  Available = 'AVAILABLE',
  End = 'END'
}

export type ColumnScoreType = {
  __typename?: 'ColumnScoreType';
  _id: Scalars['ID'];
  assignments?: Maybe<Scalars['JSONObject']>;
  class_id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  examOfClass_id?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  multiplier: Scalars['Float'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  reference_col?: Maybe<Scalars['String']>;
  scores?: Maybe<Scalars['JSONObject']>;
  type?: Maybe<ScoreType>;
  updatedAt: Scalars['DateTime'];
};

export type CreateAndUpdateScheduleInput = {
  content: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  is_learn_date: Scalars['Boolean'];
  learn_date: Scalars['String'];
};

export type CreateAssignmentInput = {
  examClass: Scalars['String'];
  student: Scalars['ID'];
};

export type CreateAttendanceInput = {
  is_present: Scalars['Boolean'];
  note?: InputMaybe<Scalars['String']>;
  user_id: Scalars['String'];
};

export type CreateClassInput = {
  avatar: Scalars['String'];
  end_date?: InputMaybe<Scalars['DateTime']>;
  from_date?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  scoreFactor: Scalars['Float'];
  studentAmount: Scalars['Float'];
  students?: InputMaybe<Array<Scalars['ID']>>;
  teachers?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateColumnScoreInput = {
  class_id: Scalars['String'];
  examOfClass_id?: InputMaybe<Scalars['String']>;
  multiplier: Scalars['Float'];
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  reference_col?: InputMaybe<Scalars['String']>;
  type: ScoreType;
};

export type CreateExamClassInput = {
  classRoom: Scalars['ID'];
  dateEnd: Scalars['DateTime'];
  dateFrom: Scalars['DateTime'];
  exam: Scalars['ID'];
  isAllowReview: Scalars['Boolean'];
  minutes: Scalars['Float'];
};

export type CreateExamInput = {
  name: Scalars['String'];
  questions: Array<Scalars['ID']>;
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateGroupInput = {
  classRoom: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  students: Array<Scalars['ID']>;
};

export type CreateMyClassInput = {
  avatar: Scalars['String'];
  end_date: Scalars['DateTime'];
  from_date: Scalars['DateTime'];
  name: Scalars['String'];
  scoreFactor: Scalars['Float'];
  students?: InputMaybe<Array<Scalars['ID']>>;
  teachers?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateQuestionInput = {
  correctAnswer: Array<AnswerInput>;
  isMultiple: Scalars['Boolean'];
  question: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateScheduleInput = {
  class_id: Scalars['String'];
  content: Scalars['String'];
  is_learn_date: Scalars['Boolean'];
  learn_date: Scalars['String'];
};

export type CreateTagInput = {
  color: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  classes?: InputMaybe<Array<Scalars['ID']>>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  role: Role;
};

export type ExamClassType = {
  __typename?: 'ExamClassType';
  _id: Scalars['ID'];
  assignmentDone?: Maybe<Array<AssignmentType>>;
  classRoom: Class;
  createdAt: Scalars['DateTime'];
  dateEnd: Scalars['DateTime'];
  dateFrom: Scalars['DateTime'];
  exam: ExamType;
  id: Scalars['String'];
  isAllowReview: Scalars['Boolean'];
  minutes: Scalars['Float'];
  owner: User;
  scoreFactor: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ExamType = {
  __typename?: 'ExamType';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
  questions: Array<QuestionType>;
  tags?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime'];
};

export type FilterClassType = {
  end_date?: InputMaybe<Scalars['DateTime']>;
  from_date?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  sortType?: InputMaybe<ClassSortType>;
  status?: InputMaybe<ClassStatus>;
};

export type GroupType = {
  __typename?: 'GroupType';
  _id: Scalars['ID'];
  class: Class;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  students: Array<User>;
  updatedAt: Scalars['DateTime'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  enCoding: Scalars['String'];
  fileName: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  mimeType: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignStudentToClass: Class;
  assignTeacherToClass: Class;
  createAssignment: AssignmentType;
  createAutoGroup: Array<GroupType>;
  createClass: Class;
  createColumnScore: ColumnScoreType;
  createExam: ExamType;
  createExamClass: ExamClassType;
  createGroup: GroupType;
  createMyClass: Class;
  createQuestion: QuestionType;
  createSchedule: ScheduleType;
  createTag: Tag;
  createUser: User;
  deleteAssignment: Scalars['Boolean'];
  deleteClass: Scalars['Boolean'];
  deleteColumnScore: Scalars['Boolean'];
  deleteExam: Scalars['Boolean'];
  deleteExamClass: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  deleteMyClass: Scalars['Boolean'];
  deleteQuestion: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: TokenAndUser;
  logout: Scalars['Boolean'];
  register: User;
  updateAssignment: AssignmentType;
  updateAttendances: Scalars['Boolean'];
  updateClass: Class;
  updateColumnScore: ColumnScoreType;
  updateExam: ExamType;
  updateExamClass: ExamClassType;
  updateGroup: GroupType;
  updateMyClass: Class;
  updateProfile: User;
  updateQuestion: QuestionType;
  updateSchedule: ScheduleType;
  updateSchedules: Scalars['Boolean'];
  updateTableScore: Scalars['Boolean'];
  updateUser: User;
  upload: Media;
};


export type MutationAssignStudentToClassArgs = {
  assignStudentToClassInput: AssignUserToClassInput;
};


export type MutationAssignTeacherToClassArgs = {
  assignTeacherToClassInput: AssignUserToClassInput;
};


export type MutationCreateAssignmentArgs = {
  createAssignmentInput: CreateAssignmentInput;
};


export type MutationCreateAutoGroupArgs = {
  classId: Scalars['String'];
  groupAmount: Scalars['Float'];
};


export type MutationCreateClassArgs = {
  createClassInput: CreateClassInput;
};


export type MutationCreateColumnScoreArgs = {
  createAttendanceInput: CreateColumnScoreInput;
};


export type MutationCreateExamArgs = {
  createExamInput: CreateExamInput;
};


export type MutationCreateExamClassArgs = {
  createExamClassInput: CreateExamClassInput;
};


export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};


export type MutationCreateMyClassArgs = {
  createMyClass: CreateMyClassInput;
};


export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};


export type MutationCreateScheduleArgs = {
  createScheduleInput: CreateScheduleInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteColumnScoreArgs = {
  deleteColumnScore: Scalars['String'];
};


export type MutationDeleteExamArgs = {
  id: Scalars['String'];
};


export type MutationDeleteExamClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMyClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTagArgs = {
  deleteMyInput: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateAssignmentArgs = {
  id: Scalars['String'];
  updateAssignmentInput: UpdateAssignmentInput;
};


export type MutationUpdateAttendancesArgs = {
  attendanceClassInput: AttendanceClassInput;
  schedule_id: Scalars['String'];
};


export type MutationUpdateClassArgs = {
  id: Scalars['String'];
  updateClassInput: UpdateClassInput;
};


export type MutationUpdateColumnScoreArgs = {
  id: Scalars['String'];
  updateColumnScoreInput: UpdateColumnScoreInput;
};


export type MutationUpdateExamArgs = {
  id: Scalars['String'];
  updateExamInput: UpdateExamInput;
};


export type MutationUpdateExamClassArgs = {
  id: Scalars['String'];
  updateExamClassInput: UpdateExamClassInput;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['String'];
  updateGroupInput: UpdateGroupInput;
};


export type MutationUpdateMyClassArgs = {
  id: Scalars['String'];
  updateMyClass: UpdateMyClassInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['String'];
  updateQuestionInput: UpdateQuestionInput;
};


export type MutationUpdateScheduleArgs = {
  updateScheduleInput: UpdateScheduleInput;
};


export type MutationUpdateSchedulesArgs = {
  class_id: Scalars['String'];
  updateSchedulesInput: UpdateSchedulesInput;
};


export type MutationUpdateTableScoreArgs = {
  class_id: Scalars['String'];
  updateTableScoreInput: UpdateTableScoreInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllAssignment: Array<AssignmentType>;
  getAllClasses: Array<Class>;
  getAllExam: Array<ExamType>;
  getAllExamClass: Array<ExamClassType>;
  getAllExamClassOfClass: Array<ExamClassType>;
  getAllGroup: Array<GroupType>;
  getAllMyAssignment: Array<AssignmentType>;
  getAllQuestion: Array<QuestionType>;
  getAllUsers: Array<User>;
  getAssignmentById: AssignmentType;
  getAttendanceToday: Array<Attendance>;
  getBadgeByClass: Array<ColumnScoreType>;
  getClassById: Class;
  getColumnScoresByClass: Array<ColumnScoreType>;
  getExamById: ExamType;
  getExamClassById: ExamClassType;
  getGroupById: GroupType;
  getGroupOfClass: Array<GroupType>;
  getHistoryAttendanceByClass: Array<Array<Attendance>>;
  getMyClass: Array<Class>;
  getMyClassStudent: Array<Class>;
  getMyExam: Array<ExamType>;
  getMyExamClass: Array<ExamClassType>;
  getMyHistoryAttendance: Array<Attendance>;
  getMyQuestion: Array<QuestionType>;
  getQuestionById: QuestionType;
  getScheduleByClass: Array<ScheduleType>;
  getScheduleByLearnDate: ScheduleType;
  getTag: Array<Tag>;
  getUserById: User;
  me: User;
  refreshToken: TokenAndUser;
};


export type QueryGetAllExamClassOfClassArgs = {
  classId: Scalars['String'];
};


export type QueryGetAssignmentByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetAttendanceTodayArgs = {
  class_id: Scalars['String'];
};


export type QueryGetBadgeByClassArgs = {
  class_id: Scalars['String'];
};


export type QueryGetClassByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetColumnScoresByClassArgs = {
  class_id: Scalars['String'];
};


export type QueryGetExamByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetExamClassByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetGroupByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetGroupOfClassArgs = {
  classId: Scalars['String'];
};


export type QueryGetHistoryAttendanceByClassArgs = {
  class_id: Scalars['String'];
};


export type QueryGetMyClassArgs = {
  fitlerClassType: FilterClassType;
};


export type QueryGetMyClassStudentArgs = {
  fitlerClassType: FilterClassType;
};


export type QueryGetMyHistoryAttendanceArgs = {
  class_id: Scalars['String'];
};


export type QueryGetQuestionByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetScheduleByClassArgs = {
  id: Scalars['String'];
};


export type QueryGetScheduleByLearnDateArgs = {
  class_id: Scalars['String'];
  learn_date: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type QuestionType = {
  __typename?: 'QuestionType';
  _id: Scalars['ID'];
  answers: Array<Scalars['String']>;
  correctAnswer: Array<AnswerType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isMultiple: Scalars['Boolean'];
  owner: User;
  question: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  username: Scalars['String'];
};

export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type ScheduleType = {
  __typename?: 'ScheduleType';
  _id: Scalars['ID'];
  class_id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  is_learn_date: Scalars['Boolean'];
  learn_date: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum ScoreType {
  Minus = 'MINUS',
  Normal = 'NORMAL',
  Plus = 'PLUS'
}

export enum Status {
  Doing = 'DOING',
  Done = 'DONE',
  DontDo = 'DONT_DO'
}

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type TokenAndUser = {
  __typename?: 'TokenAndUser';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type UpdatScoresInColumnInput = {
  id: Scalars['String'];
  scores?: InputMaybe<Scalars['JSONObject']>;
};

export type UpdateAssignmentInput = {
  answerSubmit?: InputMaybe<Array<AnswerSubmitInput>>;
  examClass?: InputMaybe<Scalars['String']>;
  minuteDoing?: InputMaybe<Scalars['Float']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateClassInput = {
  end_date?: InputMaybe<Scalars['DateTime']>;
  from_date?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  scoreFactor?: InputMaybe<Scalars['Float']>;
  studentAmount?: InputMaybe<Scalars['Float']>;
};

export type UpdateColumnScoreInput = {
  examOfClass_id?: InputMaybe<Scalars['String']>;
  multiplier: Scalars['Float'];
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  reference_col?: InputMaybe<Scalars['String']>;
  type: ScoreType;
};

export type UpdateExamClassInput = {
  classRoom?: InputMaybe<Scalars['ID']>;
  dateEnd?: InputMaybe<Scalars['DateTime']>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  exam?: InputMaybe<Scalars['ID']>;
  isAllowReview?: InputMaybe<Scalars['Boolean']>;
  minutes?: InputMaybe<Scalars['Float']>;
  scoreFactor?: InputMaybe<Scalars['Float']>;
};

export type UpdateExamInput = {
  name?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<Array<Scalars['ID']>>;
  tags: Array<Scalars['ID']>;
};

export type UpdateGroupInput = {
  classRoom?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  students?: InputMaybe<Array<Scalars['ID']>>;
};

export type UpdateMyClassInput = {
  end_date?: InputMaybe<Scalars['DateTime']>;
  from_date?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  scoreFactor?: InputMaybe<Scalars['Float']>;
};

export type UpdateProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
  oldPassword?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateQuestionInput = {
  correctAnswer?: InputMaybe<Array<AnswerInput>>;
  isMultiple?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
};

export type UpdateScheduleInput = {
  content: Scalars['String'];
  id: Scalars['String'];
  is_learn_date: Scalars['Boolean'];
};

export type UpdateSchedulesInput = {
  Schedules?: InputMaybe<Array<CreateAndUpdateScheduleInput>>;
};

export type UpdateTableScoreInput = {
  columnScores?: InputMaybe<Array<UpdatScoresInColumnInput>>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  is_online?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  token_version: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type GetAllMyAssignmentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMyAssignmentQuery = { __typename?: 'Query', getAllMyAssignment: Array<{ __typename?: 'AssignmentType', id: string, minuteDoing?: number | null, status?: Status | null, examClass: { __typename?: 'ExamClassType', id: string, dateFrom: any, dateEnd: any, isAllowReview: boolean, minutes: number, exam: { __typename?: 'ExamType', id: string, name: string, questions: Array<{ __typename?: 'QuestionType', id: string }> } } }> };

export type GetAssignmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAssignmentByIdQuery = { __typename?: 'Query', getAssignmentById: { __typename?: 'AssignmentType', id: string, startTime: any } };

export type CreateAssignmentMutationVariables = Exact<{
  createAssignmentInput: CreateAssignmentInput;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: { __typename?: 'AssignmentType', id: string, minuteDoing?: number | null, startTime: any } };

export type UpdateAssignmentMutationVariables = Exact<{
  updateAssignmentInput: UpdateAssignmentInput;
  id: Scalars['String'];
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: { __typename?: 'AssignmentType', id: string, startTime: any, score?: number | null, minuteDoing?: number | null } };

export type GetAttendanceTodayQueryVariables = Exact<{
  class_id: Scalars['String'];
}>;


export type GetAttendanceTodayQuery = { __typename?: 'Query', getAttendanceToday: Array<{ __typename?: 'Attendance', is_present: boolean, user_id: string, note: string, schedule_id: string }> };

export type GetMyHistoryAttendanceQueryVariables = Exact<{
  class_id: Scalars['String'];
}>;


export type GetMyHistoryAttendanceQuery = { __typename?: 'Query', getMyHistoryAttendance: Array<{ __typename?: 'Attendance', id: string, user_id: string, schedule_id: string, note: string, is_present: boolean, schedule?: { __typename?: 'ScheduleType', learn_date: string, content: string } | null }> };

export type GetHistoryAttendanceByClassQueryVariables = Exact<{
  class_id: Scalars['String'];
}>;


export type GetHistoryAttendanceByClassQuery = { __typename?: 'Query', getHistoryAttendanceByClass: Array<Array<{ __typename?: 'Attendance', id: string, user_id: string, is_present: boolean, note: string, schedule?: { __typename?: 'ScheduleType', id: string, content: string, learn_date: string } | null }>> };

export type UppdateAttendancesMutationVariables = Exact<{
  attendanceClassInput: AttendanceClassInput;
  schedule_id: Scalars['String'];
}>;


export type UppdateAttendancesMutation = { __typename?: 'Mutation', updateAttendances: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string, token_version: number } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenAndUser', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, address?: string | null, avatar?: string | null, id: string, role?: Role | null } } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'TokenAndUser', accessToken: string, refreshToken: string, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, address?: string | null, phoneNumber?: string | null, avatar?: string | null, id: string, role?: Role | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetMyClassQueryVariables = Exact<{
  fitlerClassType: FilterClassType;
}>;


export type GetMyClassQuery = { __typename?: 'Query', getMyClass: Array<{ __typename?: 'Class', id: string, name: string, avatar?: string | null, code: string, from_date: any, end_date: any, scoreFactor: number }> };

export type GetMyClassStudentQueryVariables = Exact<{
  fitlerClassType: FilterClassType;
}>;


export type GetMyClassStudentQuery = { __typename?: 'Query', getMyClassStudent: Array<{ __typename?: 'Class', id: string, name: string, avatar?: string | null, scoreFactor: number, code: string, from_date: any, end_date: any, owner: { __typename?: 'User', firstName?: string | null, lastName?: string | null } }> };

export type GetClassByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetClassByIdQuery = { __typename?: 'Query', getClassById: { __typename?: 'Class', name: string, avatar?: string | null, scoreFactor: number, students?: Array<{ __typename?: 'User', id: string, lastName?: string | null, firstName?: string | null, email: string, avatar?: string | null }> | null } };

export type GetClassByIdForScheduleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetClassByIdForScheduleQuery = { __typename?: 'Query', getClassById: { __typename?: 'Class', id: string, from_date: any, end_date: any, name: string } };

export type CreateMyClassMutationVariables = Exact<{
  createMyClass: CreateMyClassInput;
}>;


export type CreateMyClassMutation = { __typename?: 'Mutation', createMyClass: { __typename?: 'Class', name: string, avatar?: string | null, code: string, scoreFactor: number, createdAt: any, updatedAt: any } };

export type UpdateMyClassMutationVariables = Exact<{
  UpdateMyClassInput: UpdateMyClassInput;
  id: Scalars['String'];
}>;


export type UpdateMyClassMutation = { __typename?: 'Mutation', updateMyClass: { __typename?: 'Class', name: string, scoreFactor: number, from_date: any, end_date: any } };

export type AssignStudentToClassMutationVariables = Exact<{
  assignStudentToClass: AssignUserToClassInput;
}>;


export type AssignStudentToClassMutation = { __typename?: 'Mutation', assignStudentToClass: { __typename?: 'Class', id: string, students?: Array<{ __typename?: 'User', email: string, lastName?: string | null, firstName?: string | null, id: string }> | null } };

export type DeleteMyClassMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMyClassMutation = { __typename?: 'Mutation', deleteMyClass: boolean };

export type GetColumnScoresByClassQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetColumnScoresByClassQuery = { __typename?: 'Query', getColumnScoresByClass: Array<{ __typename?: 'ColumnScoreType', id: string, name: string, note?: string | null, type?: ScoreType | null, multiplier: number, scores?: any | null, reference_col?: string | null, examOfClass_id?: string | null, assignments?: any | null }> };

export type GetBadgeByClassQueryVariables = Exact<{
  class_id: Scalars['String'];
}>;


export type GetBadgeByClassQuery = { __typename?: 'Query', getBadgeByClass: Array<{ __typename?: 'ColumnScoreType', id: string, name: string, type?: ScoreType | null }> };

export type CreateColumnScoreMutationVariables = Exact<{
  inputCreateColumnScore: CreateColumnScoreInput;
}>;


export type CreateColumnScoreMutation = { __typename?: 'Mutation', createColumnScore: { __typename?: 'ColumnScoreType', name: string, multiplier: number, class_id: string } };

export type UpdateColumnScoreMutationVariables = Exact<{
  updateColumnScore: UpdateColumnScoreInput;
  id: Scalars['String'];
}>;


export type UpdateColumnScoreMutation = { __typename?: 'Mutation', updateColumnScore: { __typename?: 'ColumnScoreType', name: string, class_id: string, note?: string | null, type?: ScoreType | null, multiplier: number, scores?: any | null, reference_col?: string | null, examOfClass_id?: string | null } };

export type DeleteColumnScoreMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteColumnScoreMutation = { __typename?: 'Mutation', deleteColumnScore: boolean };

export type UpdateTableScoreMutationVariables = Exact<{
  updateTableScore: UpdateTableScoreInput;
  class_id: Scalars['String'];
}>;


export type UpdateTableScoreMutation = { __typename?: 'Mutation', updateTableScore: boolean };

export type GetAllExamQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExamQuery = { __typename?: 'Query', getAllExam: Array<{ __typename?: 'ExamType', id: string, name: string, createdAt: any, tags?: Array<{ __typename?: 'Tag', name: string, color: string }> | null, questions: Array<{ __typename?: 'QuestionType', id: string, question: string, answers: Array<string> }> }> };

export type GetMyExamQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyExamQuery = { __typename?: 'Query', getMyExam: Array<{ __typename?: 'ExamType', id: string, name: string, tags?: Array<{ __typename?: 'Tag', name: string, color: string }> | null }> };

export type GetExamByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetExamByIdQuery = { __typename?: 'Query', getExamById: { __typename?: 'ExamType', id: string, name: string, createdAt: any, questions: Array<{ __typename?: 'QuestionType', id: string, question: string, answers: Array<string>, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color: string }> | null }>, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color: string }> | null } };

export type CreateExamMutationVariables = Exact<{
  createExamInput: CreateExamInput;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', createExam: { __typename?: 'ExamType', name: string, id: string, tags?: Array<{ __typename?: 'Tag', name: string, color: string }> | null, questions: Array<{ __typename?: 'QuestionType', question: string, answers: Array<string> }> } };

export type UpdateExamMutationVariables = Exact<{
  updateExamInput: UpdateExamInput;
  id: Scalars['String'];
}>;


export type UpdateExamMutation = { __typename?: 'Mutation', updateExam: { __typename?: 'ExamType', name: string, tags?: Array<{ __typename?: 'Tag', name: string, color: string, id: string }> | null, questions: Array<{ __typename?: 'QuestionType', id: string, question: string, tags?: Array<{ __typename?: 'Tag', name: string, color: string, id: string }> | null }> } };

export type DeleteExamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExamMutation = { __typename?: 'Mutation', deleteExam: boolean };

export type GetAllExamClassQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExamClassQuery = { __typename?: 'Query', getAllExamClass: Array<{ __typename?: 'ExamClassType', id: string, minutes: number, dateFrom: any, dateEnd: any, scoreFactor: number, isAllowReview: boolean, exam: { __typename?: 'ExamType', id: string, name: string } }> };

export type GetExamClassByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetExamClassByIdQuery = { __typename?: 'Query', getExamClassById: { __typename?: 'ExamClassType', id: string, dateFrom: any, dateEnd: any, minutes: number, scoreFactor: number, exam: { __typename?: 'ExamType', id: string, name: string, questions: Array<{ __typename?: 'QuestionType', id: string, question: string, answers: Array<string> }> } } };

export type CreateExamClassMutationVariables = Exact<{
  createExamClassInput: CreateExamClassInput;
}>;


export type CreateExamClassMutation = { __typename?: 'Mutation', createExamClass: { __typename?: 'ExamClassType', isAllowReview: boolean, minutes: number, dateFrom: any, dateEnd: any, exam: { __typename?: 'ExamType', id: string }, classRoom: { __typename?: 'Class', id: string } } };

export type GetMyExamClassQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyExamClassQuery = { __typename?: 'Query', getMyExamClass: Array<{ __typename?: 'ExamClassType', id: string, minutes: number, scoreFactor: number, owner: { __typename?: 'User', id: string, lastName?: string | null }, exam: { __typename?: 'ExamType', name: string } }> };

export type GetGroupOfClassQueryVariables = Exact<{
  classId: Scalars['String'];
}>;


export type GetGroupOfClassQuery = { __typename?: 'Query', getGroupOfClass: Array<{ __typename?: 'GroupType', id: string, name?: string | null, class: { __typename?: 'Class', id: string, name: string }, students: Array<{ __typename?: 'User', id: string, lastName?: string | null, firstName?: string | null, avatar?: string | null }> }> };

export type CreateGroupMutationVariables = Exact<{
  createGroupInput: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GroupType', id: string, name?: string | null, class: { __typename?: 'Class', id: string }, students: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string }> } };

export type CreateAutoGroupMutationVariables = Exact<{
  classId: Scalars['String'];
  groupAmount: Scalars['Float'];
}>;


export type CreateAutoGroupMutation = { __typename?: 'Mutation', createAutoGroup: Array<{ __typename?: 'GroupType', id: string, name?: string | null, students: Array<{ __typename?: 'User', id: string, lastName?: string | null, firstName?: string | null }> }> };

export type UpdateGroupMutationVariables = Exact<{
  updateGroupInput: UpdateGroupInput;
  id: Scalars['String'];
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'GroupType', id: string, name?: string | null, class: { __typename?: 'Class', id: string, name: string }, students: Array<{ __typename?: 'User', id: string, lastName?: string | null, firstName?: string | null, avatar?: string | null }> } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: boolean };

export type CreateQuestionMutationVariables = Exact<{
  createQuestion: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'QuestionType', id: string, question: string, answers: Array<string>, isMultiple: boolean, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color: string }> | null } };

export type GetQuestionByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetQuestionByIdQuery = { __typename?: 'Query', getQuestionById: { __typename?: 'QuestionType', question: string, answers: Array<string>, isMultiple: boolean, id: string, correctAnswer: Array<{ __typename?: 'AnswerType', text: string, result: boolean }> } };

export type GetAllQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuestionQuery = { __typename?: 'Query', getAllQuestion: Array<{ __typename?: 'QuestionType', id: string, question: string, createdAt?: any | null }> };

export type GetMyQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyQuestionQuery = { __typename?: 'Query', getMyQuestion: Array<{ __typename?: 'QuestionType', id: string, question: string, createdAt?: any | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color: string }> | null }> };

export type UpdateQuestionMutationVariables = Exact<{
  updateQuestionInput: UpdateQuestionInput;
  id: Scalars['String'];
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'QuestionType', question: string, isMultiple: boolean, answers: Array<string>, correctAnswer: Array<{ __typename?: 'AnswerType', text: string, result: boolean }> } };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion: boolean };

export type GetScheduleByClassQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetScheduleByClassQuery = { __typename?: 'Query', getScheduleByClass: Array<{ __typename?: 'ScheduleType', id: string, content: string, learn_date: string, is_learn_date: boolean }> };

export type UpdateSchedulesMutationVariables = Exact<{
  updateSchedulesInput: UpdateSchedulesInput;
  class_id: Scalars['String'];
}>;


export type UpdateSchedulesMutation = { __typename?: 'Mutation', updateSchedules: boolean };

export type GetScheduleByLearnDateQueryVariables = Exact<{
  learn_date: Scalars['String'];
  class_id: Scalars['String'];
}>;


export type GetScheduleByLearnDateQuery = { __typename?: 'Query', getScheduleByLearnDate: { __typename?: 'ScheduleType', learn_date: string, id: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null }> };

export type GetInfoMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null } };

export type GetTagQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagQuery = { __typename?: 'Query', getTag: Array<{ __typename?: 'Tag', id: string, _id: string, name: string, color: string }> };

export type CreateTagMutationVariables = Exact<{
  createTagInput: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', name: string, color: string } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: boolean };

export type UpdateprofileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateprofileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, address?: string | null, avatar?: string | null } };


export const GetAllMyAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMyAssignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMyAssignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minuteDoing"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"examClass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowReview"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllMyAssignmentQuery, GetAllMyAssignmentQueryVariables>;
export const GetAssignmentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAssignmentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAssignmentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]} as unknown as DocumentNode<GetAssignmentByIdQuery, GetAssignmentByIdQueryVariables>;
export const CreateAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAssignmentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssignmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAssignmentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAssignmentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minuteDoing"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]} as unknown as DocumentNode<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const UpdateAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAssignmentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssignmentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateAssignmentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAssignmentInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minuteDoing"}}]}}]}}]} as unknown as DocumentNode<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const GetAttendanceTodayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAttendanceToday"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAttendanceToday"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_present"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_id"}}]}}]}}]} as unknown as DocumentNode<GetAttendanceTodayQuery, GetAttendanceTodayQueryVariables>;
export const GetMyHistoryAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyHistoryAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyHistoryAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"is_present"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"learn_date"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyHistoryAttendanceQuery, GetMyHistoryAttendanceQueryVariables>;
export const GetHistoryAttendanceByClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHistoryAttendanceByClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHistoryAttendanceByClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_present"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"learn_date"}}]}}]}}]}}]} as unknown as DocumentNode<GetHistoryAttendanceByClassQuery, GetHistoryAttendanceByClassQueryVariables>;
export const UppdateAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uppdateAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendanceClassInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttendanceClassInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"schedule_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attendanceClassInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendanceClassInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"schedule_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"schedule_id"}}}]}]}}]} as unknown as DocumentNode<UppdateAttendancesMutation, UppdateAttendancesMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetMyClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fitlerClassType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterClassType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fitlerClassType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fitlerClassType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"from_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}}]}}]}}]} as unknown as DocumentNode<GetMyClassQuery, GetMyClassQueryVariables>;
export const GetMyClassStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyClassStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fitlerClassType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterClassType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyClassStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fitlerClassType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fitlerClassType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"from_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyClassStudentQuery, GetMyClassStudentQueryVariables>;
export const GetClassByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClassById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClassById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<GetClassByIdQuery, GetClassByIdQueryVariables>;
export const GetClassByIdForScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClassByIdForSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClassById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetClassByIdForScheduleQuery, GetClassByIdForScheduleQueryVariables>;
export const CreateMyClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMyClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createMyClass"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMyClassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMyClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createMyClass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createMyClass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateMyClassMutation, CreateMyClassMutationVariables>;
export const UpdateMyClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMyClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UpdateMyClassInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMyClassInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateMyClass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UpdateMyClassInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"from_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}}]}}]}}]} as unknown as DocumentNode<UpdateMyClassMutation, UpdateMyClassMutationVariables>;
export const AssignStudentToClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"assignStudentToClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignStudentToClass"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignUserToClassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignStudentToClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignStudentToClassInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignStudentToClass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AssignStudentToClassMutation, AssignStudentToClassMutationVariables>;
export const DeleteMyClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMyClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteMyClassMutation, DeleteMyClassMutationVariables>;
export const GetColumnScoresByClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColumnScoresByClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColumnScoresByClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"scores"}},{"kind":"Field","name":{"kind":"Name","value":"reference_col"}},{"kind":"Field","name":{"kind":"Name","value":"examOfClass_id"}},{"kind":"Field","name":{"kind":"Name","value":"assignments"}}]}}]}}]} as unknown as DocumentNode<GetColumnScoresByClassQuery, GetColumnScoresByClassQueryVariables>;
export const GetBadgeByClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBadgeByClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBadgeByClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetBadgeByClassQuery, GetBadgeByClassQueryVariables>;
export const CreateColumnScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColumnScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputCreateColumnScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateColumnScoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColumnScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAttendanceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputCreateColumnScore"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"class_id"}}]}}]}}]} as unknown as DocumentNode<CreateColumnScoreMutation, CreateColumnScoreMutationVariables>;
export const UpdateColumnScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateColumnScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateColumnScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateColumnScoreInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColumnScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateColumnScoreInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateColumnScore"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"class_id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"scores"}},{"kind":"Field","name":{"kind":"Name","value":"reference_col"}},{"kind":"Field","name":{"kind":"Name","value":"examOfClass_id"}}]}}]}}]} as unknown as DocumentNode<UpdateColumnScoreMutation, UpdateColumnScoreMutationVariables>;
export const DeleteColumnScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteColumnScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColumnScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteColumnScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteColumnScoreMutation, DeleteColumnScoreMutationVariables>;
export const UpdateTableScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTableScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTableScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTableScoreInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTableScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTableScoreInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTableScore"}}},{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}]}]}}]} as unknown as DocumentNode<UpdateTableScoreMutation, UpdateTableScoreMutationVariables>;
export const GetAllExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllExam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllExam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllExamQuery, GetAllExamQueryVariables>;
export const GetMyExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyExam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyExam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyExamQuery, GetMyExamQueryVariables>;
export const GetExamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExamById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetExamByIdQuery, GetExamByIdQueryVariables>;
export const CreateExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createExamInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createExamInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createExamInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]}}]} as unknown as DocumentNode<CreateExamMutation, CreateExamMutationVariables>;
export const UpdateExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateExamInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExamInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateExamInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateExamInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateExamMutation, UpdateExamMutationVariables>;
export const DeleteExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteExamMutation, DeleteExamMutationVariables>;
export const GetAllExamClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllExamClass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllExamClass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowReview"}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllExamClassQuery, GetAllExamClassQueryVariables>;
export const GetExamClassByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExamClassById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExamClassById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetExamClassByIdQuery, GetExamClassByIdQueryVariables>;
export const CreateExamClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExamClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createExamClassInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExamClassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExamClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createExamClassInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createExamClassInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"classRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowReview"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dateEnd"}}]}}]}}]} as unknown as DocumentNode<CreateExamClassMutation, CreateExamClassMutationVariables>;
export const GetMyExamClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyExamClass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyExamClass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"scoreFactor"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyExamClassQuery, GetMyExamClassQueryVariables>;
export const GetGroupOfClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGroupOfClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroupOfClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupOfClassQuery, GetGroupOfClassQueryVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createGroupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGroupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createGroupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateAutoGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAutoGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAutoGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupAmount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAutoGroupMutation, CreateAutoGroupMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateGroupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const DeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const CreateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createQuestion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createQuestion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"isMultiple"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const GetQuestionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"isMultiple"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionByIdQuery, GetQuestionByIdQueryVariables>;
export const GetAllQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllQuestionQuery, GetAllQuestionQueryVariables>;
export const GetMyQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyQuestionQuery, GetMyQuestionQueryVariables>;
export const UpdateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuestionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"isMultiple"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const DeleteQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const GetScheduleByClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getScheduleByClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleByClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"learn_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_learn_date"}}]}}]}}]} as unknown as DocumentNode<GetScheduleByClassQuery, GetScheduleByClassQueryVariables>;
export const UpdateSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSchedulesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSchedulesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSchedulesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSchedulesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}]}]}}]} as unknown as DocumentNode<UpdateSchedulesMutation, UpdateSchedulesMutationVariables>;
export const GetScheduleByLearnDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getScheduleByLearnDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"learn_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleByLearnDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"learn_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"learn_date"}}},{"kind":"Argument","name":{"kind":"Name","value":"class_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"learn_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetScheduleByLearnDateQuery, GetScheduleByLearnDateQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetInfoMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInfoMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetInfoMeQuery, GetInfoMeQueryVariables>;
export const GetTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetTagQuery, GetTagQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTagInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTagInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTagInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteMyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const UpdateprofileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateprofile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<UpdateprofileMutation, UpdateprofileMutationVariables>;