import { gql } from '@apollo/client';

export const getAllUser = gql`
  # Query
  query getUsersQuery {
    getAllUsers {
      username
      email
      _id
    }
  }

  # Mutation
`;
