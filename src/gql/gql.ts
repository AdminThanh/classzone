/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  # Query\n\n  # Mutation\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n    }\n  }\n": types.RegisterDocument,
    "\n  # Query\n  query getUsersQuery {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n\n  # Mutation\n": types.GetUsersQueryDocument,
};

export function graphql(source: "\n  # Query\n\n  # Mutation\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n    }\n  }\n"): (typeof documents)["\n  # Query\n\n  # Mutation\n  mutation Register($registerInput: RegisterInput!) {\n    register(regsiterInput: $registerInput) {\n      code\n      message\n      success\n    }\n  }\n\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      code\n      success\n      accessToken\n      message\n    }\n  }\n"];
export function graphql(source: "\n  # Query\n  query getUsersQuery {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n\n  # Mutation\n"): (typeof documents)["\n  # Query\n  query getUsersQuery {\n    getAllUsers {\n      username\n      email\n      _id\n    }\n  }\n\n  # Mutation\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;