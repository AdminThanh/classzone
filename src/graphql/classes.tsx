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
      _id
      name
      avatar
      code
      from_date
      end_date
      scoreFactor
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

export const a = 5;
