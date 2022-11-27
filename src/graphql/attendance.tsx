import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getAttendanceByClass = graphql(`
  query getAttandanceByClass($id: String!) {
    getAttendanceByClass(id: $id) {
      id
      content
      learn_date
      is_learn_date
    }
  }
`);

export const updateAttendances = graphql(`
  mutation updateAttendences(
    $updateAttandancesInput: UpdateAttendancesInput!
    $class_id: String!
  ) {
    updateAttendances(
      updateAttendancesInput: $updateAttandancesInput
      class_id: $class_id
    )
  }
`);
