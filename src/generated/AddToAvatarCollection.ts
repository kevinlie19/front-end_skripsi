/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToAvatarCollection
// ====================================================

export interface AddToAvatarCollection_addToAvatarCollection_avatar {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface AddToAvatarCollection_addToAvatarCollection_avatarCollection {
  __typename: "Avatar";
  id: string;
  image: string;
  price: number;
}

export interface AddToAvatarCollection_addToAvatarCollection {
  __typename: "User";
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: AddToAvatarCollection_addToAvatarCollection_avatar | null;
  avatarCollection: AddToAvatarCollection_addToAvatarCollection_avatarCollection[] | null;
  highestScore: number;
  point: number;
  createdAt: any;
}

export interface AddToAvatarCollection {
  addToAvatarCollection: AddToAvatarCollection_addToAvatarCollection;
}

export interface AddToAvatarCollectionVariables {
  avatarId: string;
}
