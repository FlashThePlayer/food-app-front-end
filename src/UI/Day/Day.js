import React from "react";

import classes from "./Day.module.css";
import FoodItem from "../FoodItem/FoodItem";
import { Droppable } from "react-beautiful-dnd";

const Day = ({ id, food, dayName, droppableId }) => {
  let foodList;

  foodList = food.map((food, index) => {
    return (
      <FoodItem
        small={true}
        id={food._id}
        index={index}
        draggableId={`dayDraggable-${dayName}-${index}-${food._id}`}
        name={food.name}
        link={food.link}
        favorite={food.favorite}
        rating={food.rating}
        difficulty={food.difficulty}
      />
    );
  });

  return (
    <Droppable droppableId={droppableId ? droppableId : "droppableDay-" + id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={id}
          className={classes.Day}
        >
          <p>{dayName}</p>
          {foodList}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default Day;
