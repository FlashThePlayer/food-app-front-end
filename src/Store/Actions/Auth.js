import { AUTH_USER, AUTH_SUCCESS } from "./ActionTypes";

export const authUser = (token) => {
  return {
    type: AUTH_USER,
    token: token,
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};