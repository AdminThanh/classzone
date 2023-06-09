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
  query getMyClass($fitlerClassType: FilterClassType!) {
    getMyClass(fitlerClassType: $fitlerClassType) {
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

export const getMyClassStudent = gql`
  query getMyClassStudent($fitlerClassType: FilterClassType!) {
    getMyClassStudent(fitlerClassType: $fitlerClassType) {
      id
      name
      avatar
      scoreFactor
      code
      from_date
      end_date
      owner {
        firstName
        lastName
      }
    }
  }
`;

export const getClassById = gql`
  query getClassById($id: String!) {
    getClassById(id: $id) {
      name
      avatar
      scoreFactor
      students {
        id
        lastName
        firstName
        email
        avatar
      }
    }
  }
`;

export const getClassByIdForSchedule = gql`
  query getClassByIdForSchedule($id: String!) {
    getClassById(id: $id) {
      id
      from_date
      end_date
      name
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
