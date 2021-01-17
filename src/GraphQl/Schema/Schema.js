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

export const getFoodSchema = gql`
  query getFood($id: String!) {
    getFood(id: $id) {
        name
        link
        pictureLink
        favorite
        rating
        difficulty
        keywords
        recipe
    }
  }
`;

export const deleteFoodSchema = gql`
  mutation deleteFood($id: String!) {
    deleteFood(id: $id) 
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

export const patchDaySchema = gql`
  mutation patchDay($dayInput: DayInputData!) {
    patchDay(dayInput: $dayInput) {
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
