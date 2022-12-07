import { graphql } from 'gql';

export const getAllExamClassDocument = graphql(`
  query getAllExamClass {
    getAllExamClass {
      id
      minutes
      dateFrom
      dateEnd
      scoreFactor
      isAllowReview
      exam {
        id
        name
      }
    }
  }
`);

export const getExamClassById = graphql(`
  query getExamClassById($id: String!) {
    getExamClassById(id: $id) {
      id
      dateFrom
      dateEnd
      minutes
      scoreFactor
      id
      exam {
        id
        name
        questions {
          id
          question
          answers
        }
      }
    }
  }
`);

export const createExamClass = graphql(`
  mutation createExamClass($createExamClassInput: CreateExamClassInput!) {
    createExamClass(createExamClassInput: $createExamClassInput) {
      exam {
        id
      }
      classRoom {
        id
      }
      isAllowReview
      minutes
      dateFrom
      dateEnd
    }
  }
`);
