import React from "react";

import classes from "./FoodItem.module.css";
import { Draggable } from "react-beautiful-dnd";

const FoodItem = (props) => {
  return (
    <Draggable
      draggableId={props.draggableId}
      index={props.index}
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
