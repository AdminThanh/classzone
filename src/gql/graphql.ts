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
};

export type AssignUserToClassInput = {
  classId: Scalars['ID'];
  usersIds: Array<Scalars['ID']>;
};

export type Class = {
  __typename?: 'Class';
  _id: Scalars['ID'];
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
  name: Scalars['String'];
  scoreFactor: Scalars['Float'];
  studentAmount: Scalars['Float'];
  students?: InputMaybe<Array<Scalars['ID']>>;
  teachers?: InputMaybe<Array<Scalars['ID']>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  assignStudentToClass: Class;
  assignTeacherToClass: Class;
  createClass: Class;
  createUser: User;
  deleteClass: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: TokenAndUser;
  logout: Scalars['Boolean'];
  register: Token;
  updateClass: Class;
  updateUser: User;
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


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteClassArgs = {
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


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllClasses: Array<Class>;
  getAllUsers: Array<User>;
  getClassById: Class;
  getUserById: User;
  me: User;
  refreshToken: Token;
};


export type QueryGetClassByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

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
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  token_hash?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Token', accessToken: string, refreshToken: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenAndUser', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: string, firstName?: string | null, lastName?: string | null, _id: string } } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'Token', accessToken: string, refreshToken: string } };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenQuery, RefreshTokenQueryVariables>;