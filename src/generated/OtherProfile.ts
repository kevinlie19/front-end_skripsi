/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OtherProfile
// ====================================================

export interface OtherProfile_otherProfile_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface OtherProfile_otherProfile_avatarCollection {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface OtherProfile_otherProfile_progress {
  __typename: "Progress";
  id: string;
  Paket1: number;
  Paket2: number;
  Paket3: number;
}

export interface OtherProfile_otherProfile {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  avatar: OtherProfile_otherProfile_avatar | null;
  avatarCollection: OtherProfile_otherProfile_avatarCollection[] | null;
  highestScore: number;
  point: number;
  progress: OtherProfile_otherProfile_progress;
  createdAt: any;
}

export interface OtherProfile {
  otherProfile: OtherProfile_otherProfile;
}

export interface OtherProfileVariables {
  id: string;
}
