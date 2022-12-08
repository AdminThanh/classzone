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
      reference_col
      examOfClass_id
      assignments
    }
  }
`);

export const getBadgeByClass = graphql(`
  query getBadgeByClass($class_id: String!) {
    getBadgeByClass(class_id: $class_id) {
      id
      name
      type
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
      reference_col
      examOfClass_id
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
