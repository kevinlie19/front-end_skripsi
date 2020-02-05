import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query GetQuestions($category: Category!) {
    questions(category: $category) {
      id
      description
      choices {
        id
        answer
        correct
      }
      category
    }
  }
`;
