import { gql } from "@apollo/client";

export const getTag = gql`
    query getTag {
        getTag{
            id
            _id
            name
            color
        }
    }
`;

export const createTag = gql`
    mutation createTag($createTagInput: CreateTagInput!){
        createTag(createTagInput : $createTagInput){
            name
            color
        }
    }
`;

export const deleteTag = gql`
  mutation deleteTag($id:String!) {
  deleteTag(deleteMyInput: $id)
}
`;
