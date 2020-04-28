import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let classNameArray = [classes.InputElement];

  if(props.errors.length !== 0 && props.touched){
    classNameArray.push(classes.Invalid)
  }

  let inputElement;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          className={classNameArray.join(" ")}
        />
      );
      break;
    default:
      throw new Error("Input Type not supported!");
  }

  return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
      </div>
  );
};

export default Input;
