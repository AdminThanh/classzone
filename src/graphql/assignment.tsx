import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getAllMyAssignment = graphql(`
  query getAllMyAssignment {
    getAllMyAssignment {
      id
      startTime
      minuteDoing
      examClass {
        id
        exam {
          name
          questions {
            id
          }
        }
        dateFrom
        dateEnd
        isAllowReview
        minutes
      }
    }
  }
`);

export const getAssignmentById = graphql(`
  query getAssignmentById($id: String!) {
    getAssignmentById(id: $id) {
      id
      startTime
    }
  }
`);

export const createAssignment = graphql(`
  mutation createAssignment($createAssignmentInput: CreateAssignmentInput!) {
    createAssignment(createAssignmentInput: $createAssignmentInput) {
      id
      minuteDoing
      startTime
    }
  }
`);

export const updateAssignment = graphql(`
  mutation updateAssignment(
    $updateAssignmentInput: UpdateAssignmentInput!
    $id: String!
  ) {
    updateAssignment(updateAssignmentInput: $updateAssignmentInput, id: $id) {
      id
      startTime
      score
      minuteDoing
    }
  }
`);
