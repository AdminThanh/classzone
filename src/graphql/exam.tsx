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

export const getAllExamClass = graphql(`
  query getAllExamClass {
    getAllExamClass {
      id
      minutes
      dateFrom
      dateEnd
      scoreFactor
      isAllowReview
    }
  }
`);
export const getExamById = graphql(`
  query getExamById($id: String!) {
    getExamById(id: $id) {
      id
      name
      questions {
        question
        id
      }
      tags {
        name
        color
      }
      createdAt
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
