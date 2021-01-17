import React from "react";

import classes from "./FoodItem.module.css";
import { Draggable } from "react-beautiful-dnd";
import Icon from "../Icon/Icon";
import { ICONS } from "../Icon/IconConstants";
import { SIZE } from "./SizeConstants";
import { NavLink } from "react-router-dom";
import MultiLineText from "../MultiLineText/MultiLineText";

const FoodItem = (props) => {
  const maxRating = 5; //ok for now be definitely NEEDS a better place, best case given down by props
  let content;
  let cssClass;
  let rating = _fillRating(props.rating, maxRating);

  switch (props.size) {
    case SIZE.SMALL:
      cssClass = classes.SmallFoodItem;
      content = (
        <React.Fragment>
          <NavLink exact to={`getFood/${props.id}`}>
            <p>{props.name}</p>
          </NavLink>
        </React.Fragment>
      );
      content = _wrapInDroppableComponent(props, cssClass, content);
      break;
    case SIZE.MID:
      cssClass = classes.MidFoodItem;
      content = (
        <React.Fragment>
          <NavLink exact to={`getFood/${props.id}`}>
            <p>{props.name}</p>
          </NavLink>
          <div>{rating}</div>
          <p>{props.difficulty}</p>
        </React.Fragment>
      );
      content = _wrapInDroppableComponent(props, cssClass, content);
      break;
    case SIZE.BIG:
      cssClass = classes.BigFoodItem;
      content = (
        <React.Fragment>
          <NavLink exact to={`getFood/${props.id}`}>
            <p>{props.name}</p>
          </NavLink>
          <p className={classes.Link}>{props.link}</p>
          <p>{props.favorite}</p>
          <div>{rating}</div>
          <p>{props.difficulty}</p>
        </React.Fragment>
      );
      content = _wrapInDroppableComponent(props, cssClass, content);
      break;
    case SIZE.FULL:
    default:
      console.log(props.recipe)
      content = (
        <React.Fragment>
          <div className={classes.FoodItem}>
            <div className={classes.FoodInfo}>
              <p>{props.name}</p>
              <p>{props.link}</p>
              <p>{props.difficulty}</p>
              <div>
                {props.keywords.map((keyword) => (
                  <p className={classes.FoodTags}>{keyword}</p>
                ))}
              </div>
              <div>{rating}</div>
            </div>
            <div className={classes.FoodPicture}>
              <p>{props.name}</p>
              <img alt={props.name} src={props.pictureLink} />
            </div>
            <div className={classes.FoodRecipe}>
              <MultiLineText text={props.recipe}/>
            </div>
          </div>
        </React.Fragment>
      );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

const _wrapInDroppableComponent = (props, cssClass, content) => {
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

const _fillRating = (rating, maxRating) => {
  const emptyStarsCount = maxRating - rating;
  const result = [];
  for (let i = 0; i < rating; i++) {
    result.push(<Icon icon={ICONS.FullStar} />);
  }

  for (let i = 0; i < emptyStarsCount; i++) {
    result.push(<Icon icon={ICONS.EmptyStar} />);
  }
  return result;
};

export default FoodItem;
