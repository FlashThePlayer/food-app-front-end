import { AUTH_SUCCESS } from "../Actions/ActionTypes";

const initState = {
  token: null,
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;