import { gql } from '@apollo/client';

export const getAllUser = gql`
  query getUsersQuery {
    getAllUsers {
      username
      email
      _id
    }
  }
`;
