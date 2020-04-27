import React from "react";

import foodLogo from "../../Assets/Icons/restaurant.png";
import {MENU_ICON_ALT_TEXT} from "../../Assets/Icons/Creator_Link"
import classes from './Logo.module.css'

const Logo = props => (
    <div className={classes.Logo}>
        <img alt={MENU_ICON_ALT_TEXT} src={foodLogo} />
    </div>
);

export default Logo;


