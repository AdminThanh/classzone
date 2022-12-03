import { gql } from '@apollo/client';

export const createQuestion = gql`
  mutation createQuestion($createQuestion: CreateQuestionInput!) {
    createQuestion(createQuestionInput: $createQuestion) {
      id
      question
      answers
      isMultiple
      tags {
        id
        name
        color
      }
    }
  }
`;

export const getQuestionById = gql`
  query getQuestionById($id: String!) {
    getQuestionById(id: $id) {
      question
      answers
      isMultiple
      id
      correctAnswer {
        text
        result
      }
    }
  }
`;

export const getAllQuestion = gql`
  query getAllQuestion {
    getAllQuestion {
      id
      question
      createdAt
    }
  }
`;

export const getMyQuestion = gql`
  query getMyQuestion {
    getMyQuestion {
      id
      question
      createdAt
      tags {
        id
        name
        color
      }
    }
  }
`;

export const updateQuestion = gql`
  mutation updateQuestion(
    $updateQuestionInput: UpdateQuestionInput!
    $id: String!
  ) {
    updateQuestion(updateQuestionInput: $updateQuestionInput, id: $id) {
      question
      isMultiple
      answers
      correctAnswer {
        text
        result
      }
    }
  }
`;

export const deleteQuestion = gql`
  mutation deleteQuestion($id: String!) {
    deleteQuestion(id: $id)
  }
`;
