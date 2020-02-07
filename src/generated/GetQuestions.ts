/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Category, QuestionEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetQuestions
// ====================================================

export interface GetQuestions_questions_choices {
  __typename: "Choice";
  id: string;
  answer: string;
  correct: boolean;
}

export interface GetQuestions_questions {
  __typename: "Question";
  id: string;
  description: string;
  choices: GetQuestions_questions_choices[];
  category: QuestionEnum;
}

export interface GetQuestions {
  questions: GetQuestions_questions[];
}

export interface GetQuestionsVariables {
  category: Category;
}
