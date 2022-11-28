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

export const deleteColumnScore = graphql(`
  mutation deleteColumnScore($id: String!) {
    deleteColumnScore(deleteColumnScore: $id)
  }
`);
