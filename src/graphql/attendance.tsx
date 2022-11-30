import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getAttendanceToday = graphql(`
  query getAttendanceToday($class_id: String!) {
  getAttendanceToday(class_id: $class_id) {
    is_present
    user_id
    note
  }
}
`);

export const updateAttendances = graphql(`
 mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {
  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) 
}
`);

