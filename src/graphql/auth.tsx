import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const register = graphql(`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
      refreshToken
    }
  }
`);

export const login = graphql(`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
      user {
        email
        firstName
        lastName
        _id
      }
    }
  }
`);

export const refreshToken = graphql(`
  query refreshToken {
    refreshToken {
      accessToken
      refreshToken
    }
  }
`);

// export const logout = graphql(`
//   mutation Logout {
//     logout {
//       code
//       message
//       success
//     }
//   }
// `);

// export const me = graphql(`
//   query me {
//     me {
//       _id
//       username
//       email
//       createdAt
//       updatedAt
//       token_version
//     }
//   }
// `);

// export const logout = graphql(`
//   mutation Logout($arg: string!) {
//     logout(logoutInput: $arg) {
//       code
//       message
//       success
//     }
//   }
// `);
