import { gql } from '@apollo/client';

export const getAttendanceToday = gql(`
  query getAttendanceToday($class_id: String!) {
  getAttendanceToday(class_id: $class_id) {
    is_present
    user_id
    note
    schedule_id
  }
}
`);

export const updateAttendances = gql(`
 mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {
  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) 
}
`);

