import React from "react";
import { useSelector } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let navLinks = (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="auth">Login</NavigationItem>
    </ul>
  );

  if (isAuthenticated) {
    navLinks = (
      <ul className={classes.NavigationItems}>
          <NavigationItem link="/">Home</NavigationItem>
          <NavigationItem link="getFoods">your Food</NavigationItem>
          <NavigationItem link="createFood">create Food</NavigationItem>
          <NavigationItem link="logout">Logout</NavigationItem>
      </ul>
    );
  }
  return navLinks;
};

export default NavigationItems;
