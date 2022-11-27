import { gql } from '@apollo/client';

export const getAllUsers = gql`
  query getAllUsers {
    getAllUsers {
      id
      email
      firstName
      lastName
    }
  }
`;
export const getInfoMe = gql`
  query getInfoMe {
    me {
      id
      firstName
      lastName
    }
  }
`;

export const a = 5;
