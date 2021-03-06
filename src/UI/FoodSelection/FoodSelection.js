import React from "react";
import classes from "../../UI/FoodSelection/FoodSelection.module.css";
import Spinner from "../Spinner/Spinner";
import FoodItem from "../FoodItem/FoodItem";
import Pagination from "../Pagination/Pagination";
import { Droppable } from "react-beautiful-dnd";

const FoodSelection = (props) => {
  let foodList;
  let pages;

  if (props.loading) {
    foodList = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
  } else {
    foodList = props.foods.map((food, index) => {
      return (
        <FoodItem
          size={props.size}
          id={food._id}
          draggableId={"foodSelectionDraggable-" + food._id}
          index={index}
          name={food.name}
          link={food.link}
          favorite={food.favorite}
          rating={food.rating}
          difficulty={food.difficulty}
        />
      );
    });
    pages = (
      <Pagination
        currentPage={props.page}
        maxPages={props.totalPages}
        prevPage={props.prevPageHandler}
        nextPage={props.nextPageHandler}
      />
    );
  }

  if (foodList.length === 0) {
    foodList = (
      <div className={classes.NoFoodBanner}>
        <p>No food... well this is awkward  ¯\_(ツ)_/¯</p>
      </div>
    );
    pages = null;
  }

  return (
    <React.Fragment>
      <div className={classes.Content}>
        <Droppable droppableId={"droppableFood"}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {foodList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {pages}
      </div>
    </React.Fragment>
  );
};

export default FoodSelection;
