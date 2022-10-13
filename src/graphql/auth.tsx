import { gql } from '@apollo/client';

export const getAllUser = gql`
  # Query

  # Mutation
  mutation Register($registerInput: RegisterInput!) {
    register(regsiterInput: $registerInput) {
      code
      message
      success
    }
  }

  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      code
      success
      accessToken
      message
    }
  }
`;
