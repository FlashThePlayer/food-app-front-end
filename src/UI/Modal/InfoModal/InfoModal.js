import React from "react";

import classes from "./InfoModal.module.css";
import Backdrop from "../../Backdrop/Backdrop";

const infoModal = (props) => {
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
  infoModal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
