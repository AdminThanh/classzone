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

export const getMyHistoryAttendance = gql(`
  query getMyHistoryAttendance($class_id: String!) {
    getMyHistoryAttendance(class_id: $class_id) {
      id
      user_id
      schedule_id
      note
      is_present
      schedule {
        learn_date
        content
      }
    }
  }
`);

export const updateAttendances = gql(`
 mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {
  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) 
}
`);
