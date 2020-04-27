import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css"

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
      <NavigationItem>Home</NavigationItem>
      <NavigationItem>Login</NavigationItem>
  </ul>
);

export default NavigationItems;
