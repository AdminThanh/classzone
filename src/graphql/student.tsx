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

export const assignStudentToClass = gql`
  mutation assignStudentToClass(
    $assignStudentToClass: AssignUserToClassInput!
  ) {
    assignStudentToClass(assignStudentToClassInput: $assignStudentToClass) {
      id
      students {
        lastName
        firstName
        id
      }
    }
  }
`;

export const a = 5;
