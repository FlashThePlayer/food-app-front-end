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
        _id
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
        _id
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

export const createDaySchema = gql`
  mutation createDay($dayInput: DayInputData!) {
    createDay(dayInput: $dayInput) {
      meals {
        _id
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

export const deleteFoodFromDaySchema = gql`
  mutation deleteFoodFromDay($dayInput: DayInputData!) {
    deleteFoodFromDay(dayInput: $dayInput) {
      meals {
        _id
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
