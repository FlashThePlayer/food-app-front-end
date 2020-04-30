import React from "react";

import classes from "./ToggleButton.module.css";

const ToggleButton = (props) => {
  return (
      <label className={classes.Switch}>
          <input className={classes.Switch_Input} type="checkbox"/>
          <span onClick={props.clicked} className={classes.Switch_Label} data-on="SignUp" data-off="SignIn"/>
          <span onClick={props.clicked} className={classes.Switch_Handle}/>
      </label>
  );
};

export default ToggleButton;
