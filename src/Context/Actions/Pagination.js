import { PAGE_INCREMENT, PAGE_DECREMENT, PAGE_TOTALPAGES } from "./ActionTypes";

export const pageIncrement = () => {
  return {
    type: PAGE_INCREMENT
  };
};

export const pageDecrement = () => {
  return {
    type: PAGE_DECREMENT
  };
};

export const totalPages = (totalPages) => {
  return {
    type: PAGE_TOTALPAGES,
    totalPages: totalPages,
  };
};
