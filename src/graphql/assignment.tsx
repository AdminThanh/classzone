import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getAllMyAssignment = graphql(`
  query getAllMyAssignment {
    getAllMyAssignment {
      id
      minuteDoing
      status
      examClass {
        id
        exam {
          id
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
      minuteDoing
      answerSubmit {
        answer
      }
      examClass {
        id
      }
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
