import { gql } from '@apollo/client';

export const getAllUser = gql`
  # Query
  query getAllUser {
    getAllUsers {
      username
      email
      _id
    }
  }
`;

