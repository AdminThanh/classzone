import { gql } from '@apollo/client';
import { graphql } from 'gql';

export const getGroupOfClass = graphql(`
  query getGroupOfClass($classId: String!) {
    getGroupOfClass(classId: $classId) {
      id
      name
      class {
        id
        name
      }
      students {
        id
        lastName
        firstName
        avatar
      }
    }
  }
`);
export const createGroup = graphql(`
  mutation createGroup($createGroupInput: CreateGroupInput!) {
    createGroup(createGroupInput: $createGroupInput) {
      id
      name
      class {
        id
      }
      students {
        id
        firstName
        lastName
        email
      }
    }
  }
`);
export const createAutoGroup = graphql(`
  mutation createAutoGroup($classId: String!, $groupAmount: Float!) {
    createAutoGroup(classId: $classId, groupAmount: $groupAmount) {
      id
      name
      students {
        id
        lastName
        firstName
      }
    }
  }
`);
export const updateGroup = graphql(`
  mutation updateGroup($updateGroupInput: UpdateGroupInput!, $id: String!) {
    updateGroup(updateGroupInput: $updateGroupInput, id: $id) {
      id
      name
      class {
        id
        name
      }
      students {
        id
        lastName
        firstName
        avatar
      }
    }
  }
`);
export const deleteGroup = graphql(`
  mutation deleteGroup($id: String!) {
    deleteGroup(id: $id)
  }
`);
