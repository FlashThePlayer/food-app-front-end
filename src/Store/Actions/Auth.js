import {
  AUTH_USER,
  AUTH_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_USER,
  CHECK_AUTH_STATE,
  CHECK_AUTH_EXP_DATE,
} from "./ActionTypes";

export const authUser = (token, email, history) => {
  return {
    type: AUTH_USER,
    token: token,
    userEmail: email,
    history: history
  };
};

export const authSuccess = (token, email) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userEmail: email,
  };
};

export const logout = (history) => {
  return {
    type: LOGOUT_USER,
    history: history
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const checkAuthExpDate = (expirationTime, history) => {
  return {
    type: CHECK_AUTH_EXP_DATE,
    expirationTime: expirationTime,
    history: history
  };
};

export const checkAuthState = (history) => {
  return {
    type: CHECK_AUTH_STATE,
    history: history
  }
}
