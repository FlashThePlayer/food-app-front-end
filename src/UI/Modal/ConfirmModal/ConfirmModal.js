import React from "react";

import classes from "./ConfimModal.module.css";

import Button from "../../Button/Button/Button";
import Backdrop from "../../Backdrop/Backdrop";

const confirmModal = (props) => {
  let display = props.children;
  if (props.show) {
    display = (
      <React.Fragment>
        <Backdrop show={props.show} />
        <div className={classes.ConfirmModal}>
          <p>{props.message}</p>
          <div>
            <Button type={"button"} onClickHandler={props.confirmHandler}>
              confirm
            </Button>
            <Button type={"button"} onClickHandler={props.abortHandler}>
              abort
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return display;
};

export default React.memo(
  confirmModal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.message === prevProps.message
);
