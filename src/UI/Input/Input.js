import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let classNameArray = [classes.InputElement];
  let error;

  if (props.error) {
    classNameArray.push(classes.Invalid);
    error = <p style={{color: "red"}}>{props.error.message}</p>
  }

  let inputElement;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          ref={props.fromReference}
          {...props.elementConfig}
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
      {error}
      {inputElement}
    </div>
  );
};

export default Input;
