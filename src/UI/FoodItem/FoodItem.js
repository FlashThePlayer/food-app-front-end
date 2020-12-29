import React from "react";

import classes from "./FoodItem.module.css";
import { Draggable } from "react-beautiful-dnd";
import Icon from "../Icon/Icon";
import { ICONS } from "../Icon/IconConstants";

const FoodItem = (props) => {
  let content;
  let cssClass;

  switch (props.size) {
    case "small":
      cssClass = classes.SmallFoodItem;
      content = (
        <React.Fragment>
          <p>{props.name}</p>
        </React.Fragment>
      );
      break;
    case "mid":
      cssClass = classes.MidFoodItem;
      content = (
        <React.Fragment>
          <p>{props.name}</p>
          <p>{props.rating}</p>
          <p>{props.difficulty}</p>
        </React.Fragment>
      );
      break;
    case "full":
    default:
      cssClass = classes.MidFoodItem;
      content = (
        <React.Fragment>
          <p>{props.name}</p>
          <p className={classes.Link}>{props.link}</p>
          <p>{props.favorite}</p>
          <p>{props.rating}</p>
          <p>{props.difficulty}</p>
        </React.Fragment>
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
          key={props.id}
          className={cssClass}
        >
          {content}
          <div {...provided.dragHandleProps}>
            <Icon icon={ICONS.ControlIndicator} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FoodItem;
