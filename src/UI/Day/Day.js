import React from "react";

import classes from "./Day.module.css";
import FoodItem from "../FoodItem/FoodItem";
import { Droppable } from "react-beautiful-dnd";

const Day = ({ id, food, date }) => {
  const dayName = _getDayName(date, "en-EN");
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
    <Droppable droppableId={"droppableDay-" + id}>
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

const _getDayName = (dateString, locale) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export default Day;
