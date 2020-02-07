/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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

export interface MyProfile_myProfile_progress {
  __typename: "Progress";
  id: string;
  Paket1: number;
  Paket2: number;
  Paket3: number;
}

export interface MyProfile_myProfile {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  avatar: MyProfile_myProfile_avatar | null;
  avatarCollection: MyProfile_myProfile_avatarCollection[] | null;
  highestScore: number;
  point: number;
  progress: MyProfile_myProfile_progress;
  createdAt: any;
}

export interface MyProfile {
  myProfile: MyProfile_myProfile;
}
