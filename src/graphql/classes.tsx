import { gql } from '@apollo/client';

// export const getAllClasses = gql`
//   # Query
//   query getAllClasses {
//     getAllClasses {
//       username
//       email
//       _id
//     }
//   }
// `;

export const getMyClass = gql`
  query getMyClass {
    getMyClass {
      id
      name
      avatar
      code
      from_date
      end_date
      scoreFactor
    }
  }
`;
export const getClassById = gql`
  query getClassById($id: String!) {
    getClassById(id: $id) {
      name
      students {
        avatar
        id
        lastName
        firstName
        email
      }
    }
  }
`;

export const createMyClass = gql`
  mutation createMyClass($createMyClass: CreateMyClassInput!) {
    createMyClass(createMyClass: $createMyClass) {
      name
      avatar
      code
      scoreFactor
      createdAt
      updatedAt
    }
  }
`;

export const updateMyClass = gql`
  mutation updateMyClass(
    $UpdateMyClassInput: UpdateMyClassInput!
    $id: String!
  ) {
    updateMyClass(updateMyClass: $UpdateMyClassInput, id: $id) {
      name
      scoreFactor
      from_date
      end_date
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
        email
        lastName
        firstName
        id
      }
    }
  }
`;

export const deleteMyClass = gql`
  mutation deleteMyClass($id: String!) {
    deleteMyClass(id: $id)
  }
`;

export const a = 5;
