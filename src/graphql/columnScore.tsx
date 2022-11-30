import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getColumnScoreByClass = graphql(`
  query getColumnScoresByClass($id: String!) {
    getColumnScoresByClass(class_id: $id) {
      id
      name
      note
      type
      multiplier
      scores
    }
  }
`);

export const createColumnScoreByClass = graphql(`
  mutation createColumnScore($inputCreateColumnScore: CreateColumnScoreInput!) {
    createColumnScore(createAttendanceInput: $inputCreateColumnScore) {
      name
      multiplier
      class_id
    }
  }
`);

export const updateColumnScoreByClass = graphql(`
  mutation updateColumnScore(
    $updateColumnScore: UpdateColumnScoreInput!
    $id: String!
  ) {
    updateColumnScore(updateColumnScoreInput: $updateColumnScore, id: $id) {
      name
      class_id
      note
      type
      multiplier
      scores
    }
  }
`);

export const deleteColumnScore = graphql(`
  mutation deleteColumnScore($id: String!) {
    deleteColumnScore(deleteColumnScore: $id)
  }
`);

export const updateTableScore = graphql(`
  mutation updateTableScore(
    $updateTableScore: UpdateTableScoreInput!
    $class_id: String!
  ) {
    updateTableScore(
      updateTableScoreInput: $updateTableScore
      class_id: $class_id
    )
  }
`);
