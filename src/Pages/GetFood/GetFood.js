import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { getFoodSchema } from "../../GraphQl/Schema/Schema";
import Spinner from "../../UI/Spinner/Spinner";
import { useParams } from "react-router";
import FoodItem from "../../UI/FoodItem/FoodItem";
import { SIZE } from "../../UI/FoodItem/SizeConstants";

const GetFood = () => {
  let content = <Spinner />;
  let { id: foodId } = useParams();

  const [getFood, { data }] = useLazyQuery(getFoodSchema);

  useEffect(() => {
    getFood({ variables: { id: foodId } });
  }, [foodId, getFood]);

  if (data) {
    const food = data.getFood;

    content = (
      <FoodItem
        size={SIZE.FULL}
        name={food.name}
        link={food.link}
        difficulty={food.difficulty}
        keywords={food.keywords}
        rating={food.rating}
        pictureLink={food.pictureLink}
        recipe={food.recipe}
      />
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default GetFood;
