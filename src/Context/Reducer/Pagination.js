import {
  PAGE_INCREMENT,
  PAGE_DECREMENT,
  PAGE_TOTALPAGES,
} from "../Actions/ActionTypes";

export const pageReducer = (state, action) => {
  switch (action.type) {
    case PAGE_INCREMENT:
      return {
        ...state,
        page: state.page + 1,
      };
    case PAGE_DECREMENT:
      return {
        ...state,
        page: state.page - 1,
      };
    case PAGE_TOTALPAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };
    default:
      return { ...state };
  }
};
