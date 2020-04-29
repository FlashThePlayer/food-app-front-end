import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  let display = props.children;
  if (props.show) {
      display = (
      <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={classes.Modal}>
            {props.children}
        </div>
      </React.Fragment>
    );
  }

  return display;
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
