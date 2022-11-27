/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getAttandanceByClass($id: String!) {\n    getAttendanceByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n": types.GetAttandanceByClassDocument,
    "\n  mutation updateAttendences(\n    $updateAttandancesInput: UpdateAttendancesInput!\n    $class_id: String!\n  ) {\n    updateAttendances(\n      updateAttendancesInput: $updateAttandancesInput\n      class_id: $class_id\n    )\n  }\n": types.UpdateAttendencesDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        _id\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        id\n        role\n      }\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
};

export function graphql(source: "\n  query getAttandanceByClass($id: String!) {\n    getAttendanceByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n"): (typeof documents)["\n  query getAttandanceByClass($id: String!) {\n    getAttendanceByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateAttendences(\n    $updateAttandancesInput: UpdateAttendancesInput!\n    $class_id: String!\n  ) {\n    updateAttendances(\n      updateAttendancesInput: $updateAttandancesInput\n      class_id: $class_id\n    )\n  }\n"): (typeof documents)["\n  mutation updateAttendences(\n    $updateAttandancesInput: UpdateAttendancesInput!\n    $class_id: String!\n  ) {\n    updateAttendances(\n      updateAttendancesInput: $updateAttandancesInput\n      class_id: $class_id\n    )\n  }\n"];
export function graphql(source: "\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n"];
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        _id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        _id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        id\n        role\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;