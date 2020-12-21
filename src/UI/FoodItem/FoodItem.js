import React from "react";

import classes from "./FoodItem.module.css";
import { Draggable } from "react-beautiful-dnd";

const FoodItem = (props) => {
  return (
    <Draggable
      draggableId={"foodItem-" + props.id}
      index={props.id}
      key={props.id}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={props.id}
          className={classes.FoodItem}
        >
          <p>{props.name}</p>
          <p>{props.link}</p>
          <p>{props.favorite}</p>
          <p>{props.rating}</p>
          <p>{props.difficulty}</p>
        </div>
      )}
    </Draggable>
  );
};

export default FoodItem;
