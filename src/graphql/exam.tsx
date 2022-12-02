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
export const getExamById = graphql(`
  query getExamById($id: String!) {
    getExamById(id: $id) {
      id
      name
      questions {
        id
        question
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
export const deleteExam = graphql(`
  mutation deleteExam($id: String!) {
    deleteExam(id: $id)
  }
`);
