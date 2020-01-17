/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "Auth";
  token: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  name: string;
  email: string;
  password: string;
  avatarId: string;
}
