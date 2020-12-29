import React from "react";

const Icon = (props) => (
  <svg width={props.width ? props.width : "22"} height={props.height ? props.height : "22"} viewBox={props.icon.viewBox}>
    <path d={props.icon.iconPath} />
  </svg>
);

export default Icon;
