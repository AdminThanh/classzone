/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n      user {\n        _id\n        username\n        email\n        updatedAt\n        createdAt\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      code\n      message\n      success\n    }\n  }\n": types.LogoutDocument,
    "\n  query me {\n    me {\n      _id\n      username\n      email\n      createdAt\n      updatedAt\n      token_version\n    }\n  }\n": types.MeDocument,
    "\n  # Query\n  query getAllUser {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n": types.GetAllUserDocument,
};

export function graphql(source: "\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n"];
export function graphql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n      user {\n        _id\n        username\n        email\n        updatedAt\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n      user {\n        _id\n        username\n        email\n        updatedAt\n        createdAt\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation Logout {\n    logout {\n      code\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      code\n      message\n      success\n    }\n  }\n"];
export function graphql(source: "\n  query me {\n    me {\n      _id\n      username\n      email\n      createdAt\n      updatedAt\n      token_version\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      _id\n      username\n      email\n      createdAt\n      updatedAt\n      token_version\n    }\n  }\n"];
export function graphql(source: "\n  # Query\n  query getAllUser {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n"): (typeof documents)["\n  # Query\n  query getAllUser {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;