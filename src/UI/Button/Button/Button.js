import React from "react";
import classes from "./Button.module.css";

const Button = ({children, type, onClickHandler}) => (
    <button onClick={onClickHandler} className={classes.Button} type={type}>
        {children}
    </button>
)

export default Button
