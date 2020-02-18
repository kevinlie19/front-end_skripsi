/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Leaderboard
// ====================================================

export interface Leaderboard_leaderboard_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface Leaderboard_leaderboard {
  __typename: "User";
  id: string;
  name: string;
  avatar: Leaderboard_leaderboard_avatar | null;
  highestScore: number;
}

export interface Leaderboard {
  leaderboard: Leaderboard_leaderboard[];
}
