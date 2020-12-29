import React from "react";

import classes from "./FoodItem.module.css";
import { Draggable } from "react-beautiful-dnd";

const FoodItem = (props) => {
  let content;

  switch (props.size) {
    case "small":
      content = (
        <div className={classes.SmallFoodItem}>
          <p>{props.name}</p>
        </div>
      );
      break;
    case "mid":
      content = (
        <div className={classes.MidFoodItem}>
          <p>{props.name}</p>
          <p>{props.rating}</p>
          <p>{props.difficulty}</p>
        </div>
      );
      break;
    case "full":
    default:
      content = (
        <div className={classes.FoodItem}>
          <p>{props.name}</p>
          <p className={classes.Link}>{props.link}</p>
          <p>{props.favorite}</p>
          <p>{props.rating}</p>
          <p>{props.difficulty}</p>
        </div>
      );
  }

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
          className={classes.Content}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default FoodItem;
