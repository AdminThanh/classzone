import { gql } from '@apollo/client';

// // export const getAllUser = gql`
// //   # Query
// //   query getAllUser {
// //     getAllUsers {
// //       username
// //       email
// //       _id
// //     }
// //   }
// // `;

export const updateProfile = gql`
mutation updateprofile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      firstName
      lastName
      phoneNumber
      address
      avatar
    }
  }`;
