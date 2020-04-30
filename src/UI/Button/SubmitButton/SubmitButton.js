import React from "react";
import classes from "./SubmitButton.module.css";

const SubmitButton = props => (
    <button className={classes.Button} type="submit">
        {props.children}
    </button>
)

export default SubmitButton
