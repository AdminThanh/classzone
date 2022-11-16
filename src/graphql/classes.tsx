import { gql } from '@apollo/client';

export const getAllClasses = gql`
  # Query
  query getAllClasses {
    getAllClasses {
      username
      email
      _id
    }
  }
`;

