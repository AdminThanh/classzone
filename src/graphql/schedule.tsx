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

export const getScheduleByLearnDate = graphql(`
  query getScheduleByLearnDate($learn_date: String!, $class_id: String!) {
    getScheduleByLearnDate(learn_date: $learn_date, class_id: $class_id) {
      learn_date
      id
    }
  }
`);
