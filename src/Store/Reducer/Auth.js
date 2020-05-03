import { AUTH_SUCCESS, LOGOUT_SUCCESS } from "../Actions/ActionTypes";

const initState = {
  token: null,
  userEmail: null,
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userEmail: action.userEmail,
  };
};

const logoutSuccess = (state, action) => {
  return {
    ...state,
    token: null,
    userEmail: null,
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case LOGOUT_SUCCESS:
      return logoutSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
