/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserProgress
// ====================================================

export interface UpdateUserProgress_updateUserProgress_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface UpdateUserProgress_updateUserProgress_avatarCollection {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface UpdateUserProgress_updateUserProgress_progress {
  __typename: "Progress";
  id: string;
  Paket1: number;
  Paket2: number;
  Paket3: number;
}

export interface UpdateUserProgress_updateUserProgress {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  avatar: UpdateUserProgress_updateUserProgress_avatar | null;
  avatarCollection: UpdateUserProgress_updateUserProgress_avatarCollection[] | null;
  highestScore: number;
  point: number;
  progress: UpdateUserProgress_updateUserProgress_progress;
  createdAt: any;
}

export interface UpdateUserProgress {
  updateUserProgress: UpdateUserProgress_updateUserProgress;
}

export interface UpdateUserProgressVariables {
  Paket1?: number | null;
  Paket2?: number | null;
  Paket3?: number | null;
}
