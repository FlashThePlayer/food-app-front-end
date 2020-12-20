import React from "react";

import classes from "./FoodItem.module.css";

const FoodItem = (props) => {
  return (
    <div key={props.id} className={classes.FoodItem}>
      <p>{props.name}</p>
      <p>{props.link}</p>
      <p>{props.favorite}</p>
      <p>{props.rating}</p>
      <p>{props.difficulty}</p>
    </div>
  );
};

export default FoodItem;