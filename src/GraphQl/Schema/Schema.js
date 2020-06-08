import gql from "graphql-tag";

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
  query getFoods($page: Int) {
    getFoods(page: $page) {
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
