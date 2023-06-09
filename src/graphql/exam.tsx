import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getAllExam = graphql(`
  query getAllExam {
    getAllExam {
      id
      name
      createdAt
      tags {
        name
        color
      }
      questions {
        id
        question
        answers
      }
    }
  }
`);
// export const getAllExamOfClass = graphql(`
//   query getAllExamOfClass($classId: String!) {
//     getAllExamOfClass(classId: $classId) {
//       id
//       exam {
//         name
//         questions {
//           question
//         }
//       }
//     }
//   }
// `);

export const getMyExam = graphql(`
  query getMyExam {
    getMyExam {
      id
      name
      tags {
        name
        color
      }
    }
  }
`);

export const getAllExamClassOfClass = graphql(`
  query getAllExamClassOfClass($classId: String!) {
    getAllExamClassOfClass(classId: $classId) {
      id
      dateEnd
      dateFrom
      minutes
      classRoom {
        students {
          id
          firstName
          lastName
        }
      }
      assignmentDone {
        id
        minuteDoing
        score
        status
        startTime
        student {
          firstName
          lastName
        }
      }
      exam {
        id
        name
        tags {
          name
          color
        }
        questions {
          question
          id
        }
      }
    }
  }
`);

export const getExamById = graphql(`
  query getExamById($id: String!) {
    getExamById(id: $id) {
      id
      name
      createdAt
      questions {
        id
        question
        answers
        correctAnswer {
          text
          result
        }
        tags {
          id
          name
          color
        }
      }
      tags {
        id
        name
        color
      }
    }
  }
`);

export const createExam = graphql(`
  mutation createExam($createExamInput: CreateExamInput!) {
    createExam(createExamInput: $createExamInput) {
      name
      id
      tags {
        name
        color
      }
      questions {
        question
        answers
      }
    }
  }
`);
export const updateExam = graphql(`
  mutation updateExam($updateExamInput: UpdateExamInput!, $id: String!) {
    updateExam(updateExamInput: $updateExamInput, id: $id) {
      name
      tags {
        name
        color
        id
      }
      questions {
        id
        question
        tags {
          name
          color
          id
        }
      }
    }
  }
`);
export const deleteExam = graphql(`
  mutation deleteExam($id: String!) {
    deleteExam(id: $id)
  }
`);
