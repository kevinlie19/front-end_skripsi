/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuestionEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyProfile
// ====================================================

export interface MyProfile_myProfile_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface MyProfile_myProfile_avatarCollection {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface MyProfile_myProfile_badge {
  __typename: "Badge";
  id: string;
  name: string;
}

export interface MyProfile_myProfile_exams_choices_question {
  __typename: "Question";
  id: string;
  description: string;
  category: QuestionEnum;
}

export interface MyProfile_myProfile_exams_choices {
  __typename: "Choice";
  id: string;
  question: MyProfile_myProfile_exams_choices_question | null;
  answer: string;
  correct: boolean;
}

export interface MyProfile_myProfile_exams {
  __typename: "Exam";
  id: string;
  choices: MyProfile_myProfile_exams_choices[] | null;
}

export interface MyProfile_myProfile {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  avatar: MyProfile_myProfile_avatar | null;
  avatarCollection: MyProfile_myProfile_avatarCollection[] | null;
  badge: MyProfile_myProfile_badge[] | null;
  highestScore: number;
  point: number;
  exams: MyProfile_myProfile_exams[] | null;
  createdAt: any;
}

export interface MyProfile {
  myProfile: MyProfile_myProfile;
}
