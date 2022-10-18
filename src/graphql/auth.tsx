import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const register = graphql(`
  mutation Register($registerInput: RegisterInput!) {
    register(regsiterInput: $registerInput) {
      code
      message
      success
    }
  }
`);

export const login = graphql(`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      code
      success
      accessToken
      message
      user {
        _id
        username
        email
        updatedAt
        createdAt
      }
    }
  }
`);

export const logout = graphql(`
  mutation Logout {
    logout {
      code
      message
      success
    }
  }
`);

export const me = graphql(`
  query me {
    me {
      _id
      username
      email
      createdAt
      updatedAt
      token_version
    }
  }
`);

// export const logout = graphql(`
//   mutation Logout($arg: string!) {
//     logout(logoutInput: $arg) {
//       code
//       message
//       success
//     }
//   }
// `);
