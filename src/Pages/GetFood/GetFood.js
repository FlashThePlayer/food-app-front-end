import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getFoodSchema, deleteFoodSchema } from "../../GraphQl/Schema/Schema";
import Spinner from "../../UI/Spinner/Spinner";
import { useParams } from "react-router";
import FoodItem from "../../UI/FoodItem/FoodItem";
import { SIZE } from "../../UI/FoodItem/SizeConstants";
import ConfirmModal from "../../UI/Modal/ConfirmModal/ConfirmModal";

const GetFood = (props) => {
  let content = <Spinner />;
  let { id: foodId } = useParams();

  const [displayModal, setDisplayModal] = useState(false);
  const [getFood, { data }] = useLazyQuery(getFoodSchema);
  const [deleteFood, { loading }] = useMutation(deleteFoodSchema);

  useEffect(() => {
    getFood({ variables: { id: foodId } });
  }, [foodId, getFood]);

  const displayModalHandler = () => {
    setDisplayModal((prevState) => !prevState);
  };

  const deleteFoodHandler = () => {
    deleteFood({ variables: { id: foodId } })
      .then((response) => props.history.push("/getFoods"))
      .catch((e) => console.log(e));
  };

  let deleteModal = undefined;

  if (displayModal) {
    deleteModal = (
      <ConfirmModal
        show={displayModal}
        confirmHandler={deleteFoodHandler}
        abortHandler={displayModalHandler}
        message={"Do you really want to delete this Recipe?"}
      />
    );
  }

  if (data) {
    const food = data.getFood;

    content = (
      <React.Fragment>
        {deleteModal}
        <FoodItem
          size={SIZE.FULL}
          name={food.name}
          link={food.link}
          difficulty={food.difficulty}
          onClickHandler={displayModalHandler}
          keywords={food.keywords}
          rating={food.rating}
          pictureLink={food.pictureLink}
          recipe={food.recipe}
        />
      </React.Fragment>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default GetFood;
