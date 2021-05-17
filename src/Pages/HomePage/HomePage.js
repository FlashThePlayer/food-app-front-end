import React from "react";

import classes from "./HomePage.module.css";
import {ICONS} from "../../UI/Icon/IconConstants";
import Icon from "../../UI/Icon/Icon";

const HomePage = (props) => (
  <div className={classes.Homepage}>
    <h1>Welcome to your Food App Week planer!</h1>
    <p>Create your own meal plan for each coming week</p>
    <p>with your favorite meals you collected from the internet</p>
    <p>try it out!</p>
    <p>Click on <b>create Food</b> to create or store your favorite foods from the internet</p>
    <p>Click on <b>your Food</b> to browser all food items you created</p>
    <p>And finally click on <b>your Week</b> to create your own meal plan for the coming weeks</p>
    <p>all done by drag an drop through the <Icon icon={ICONS.ControlIndicator} /> symbol</p>
  </div>
);
export default HomePage;
