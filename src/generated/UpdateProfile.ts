/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface UpdateProfile_updateProfile_avatarCollection {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface UpdateProfile_updateProfile {
  __typename: "User";
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: UpdateProfile_updateProfile_avatar | null;
  avatarCollection: UpdateProfile_updateProfile_avatarCollection[] | null;
  highestScore: number;
  point: number;
  createdAt: any;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile;
}

export interface UpdateProfileVariables {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  avatarId?: string | null;
  highestScore?: number | null;
  point?: number | null;
}
