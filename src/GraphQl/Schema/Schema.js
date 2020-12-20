import { gql } from "@apollo/client";

export const createUserSchema = gql`
  mutation createUser($userInput: createUserInputData) {
    createUser(userInput: $userInput) {
      name
      email
    }
  }
`;

export const loginUserSchema = gql`
  mutation loginUser($userInput: loginUserInputData) {
    loginUser(userInput: $userInput)
  }
`;

export const createFoodSchema = gql`
  mutation createFood($foodInput: FoodInputData) {
    createFood(foodInput: $foodInput) {
      name
    }
  }
`;

export const getFoodsSchema = gql`
  query getFoods($page: Int, $query: foodQuery) {
    getFoods(page: $page, query: $query) {
      foods {
        name
        link
        favorite
        rating
        difficulty
      }
      totalPages
    }
  }
`;

export const getDaysSchema = gql`
  query getDays($date: String!) {
    getDays(date: $date) {
      meals {
        name
        link
        favorite
        rating
        difficulty
      }
      date
    }
  }
`;

export const createDaysSchema = gql`
  query createDays($dayInput: [createDayInputData!]) {
    createDays(dayInput: $dayInput) {
      success
    }
  }
`;
