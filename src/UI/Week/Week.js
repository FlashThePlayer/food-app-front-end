import React from "react";

import classes from "./Week.module.css";
import Spinner from "../Spinner/Spinner";
import Day from "../Day/Day";

const Week = ({ id, year, month, days, loading }) => {
  let dayList;

  if (loading) {
    dayList = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
  } else {
      dayList = days.map((day, index) => {
          return (<Day id={index} food={day.meals} date={day.date} />)
      })
  }

  return (
    <div key={id} className={classes.Week}>
      <div className={classes.PointInTime}>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      <div className={classes.Days}>{dayList}</div>
    </div>
  );
};

export default Week;
