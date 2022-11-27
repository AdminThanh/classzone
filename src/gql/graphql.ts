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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AnswerInput = {
  result: Scalars['Boolean'];
  text: Scalars['String'];
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

export type Class = {
  __typename?: 'Class';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  scoreFactor: Scalars['Float'];
  studentAmount: Scalars['Float'];
  students?: Maybe<Array<User>>;
  teachers?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
};

export type CreateClassInput = {
  avatar: Scalars['Upload'];
  name: Scalars['String'];
  scoreFactor: Scalars['Float'];
  studentAmount: Scalars['Float'];
  students?: InputMaybe<Array<Scalars['ID']>>;
  teachers?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateMyClassInput = {
  banner: Scalars['String'];
  end_date: Scalars['DateTime'];
  from_date: Scalars['DateTime'];
  name: Scalars['String'];
  scoreFactor: Scalars['Float'];
};

export type CreateQuestionInput = {
  answers: Array<Scalars['String']>;
  correctAnswer: Array<AnswerInput>;
  isMutiple: Scalars['Boolean'];
  question: Scalars['String'];
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
  createClass: Class;
  createMyClass: Class;
  createQuestion: QuestionType;
  createUser: User;
  deleteClass: Scalars['Boolean'];
  deleteMyClass: Scalars['Boolean'];
  deleteQuestion: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: TokenAndUser;
  logout: Scalars['Boolean'];
  register: User;
  updateClass: Class;
  updateMyClass: Class;
  updateProfile: User;
  updateQuestion: QuestionType;
  updateUser: User;
  upload: Media;
};


export type MutationAssignStudentToClassArgs = {
  assignStudentToClassInput: AssignUserToClassInput;
};


export type MutationAssignTeacherToClassArgs = {
  assignTeacherToClassInput: AssignUserToClassInput;
};


export type MutationCreateClassArgs = {
  createClassInput: CreateClassInput;
};


export type MutationCreateMyClassArgs = {
  createMyClass: CreateMyClassInput;
};


export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMyClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['String'];
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


export type MutationUpdateClassArgs = {
  id: Scalars['String'];
  updateClassInput: UpdateClassInput;
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


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllClasses: Array<Class>;
  getAllQuestion: Array<QuestionType>;
  getAllUsers: Array<User>;
  getClassById: Class;
  getMyClass: Array<Class>;
  getQuestionById: QuestionType;
  getUserById: User;
  me: User;
  refreshToken: TokenAndUser;
};


export type QueryGetClassByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetQuestionByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type QuestionType = {
  __typename?: 'QuestionType';
  _id: Scalars['ID'];
  answers: Array<Scalars['String']>;
  correctAnswer: Array<AnswerType>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isMutiple: Scalars['Boolean'];
  owner: User;
  question: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type TokenAndUser = {
  __typename?: 'TokenAndUser';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type UpdateClassInput = {
  name?: InputMaybe<Scalars['String']>;
  scoreFactor?: InputMaybe<Scalars['Float']>;
  studentAmount?: InputMaybe<Scalars['Float']>;
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
  answers?: InputMaybe<Array<Scalars['String']>>;
  correctAnswer?: InputMaybe<Array<AnswerInput>>;
  isMutiple?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
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
  avatar: Scalars['Upload'];
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  token_version: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string, token_version: number } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenAndUser', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, address?: string | null, _id: string } } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'TokenAndUser', accessToken: string, refreshToken: string, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, address?: string | null, phoneNumber?: string | null, avatar: any, id: string, role?: Role | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateprofileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateprofileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, address?: string | null } };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateprofileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateprofile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<UpdateprofileMutation, UpdateprofileMutationVariables>;