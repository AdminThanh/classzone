import { graphql } from 'gql';

export const getScheduleByClass = graphql(`
  query getScheduleByClass($id: String!) {
    getScheduleByClass(id: $id) {
      id
      content
      learn_date
      is_learn_date
    }
  }
`);

export const updateSchedules = graphql(`
  mutation updateSchedules(
    $updateSchedulesInput: UpdateSchedulesInput!
    $class_id: String!
  ) {
    updateSchedules(
      updateSchedulesInput: $updateSchedulesInput
      class_id: $class_id
    )
  }
`);
