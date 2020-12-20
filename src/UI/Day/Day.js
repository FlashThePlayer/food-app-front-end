import React from "react";

import classes from "./Day.module.css";
import FoodItem from "../FoodItem/FoodItem";

const Day = ({ id, food, date }) => {
  const dayName = _getDayName(date, "en-EN");
  let foodList;

  foodList = food.map((food, index) => {
    return (
      <FoodItem
        id={index}
        name={food.name}
        link={food.link}
        favorite={food.favorite}
        rating={food.rating}
        difficulty={food.difficulty}
      />
    );
  });

  return (
    <div key={id} className={classes.Day}>
      <p>{dayName}</p>
      {foodList}
    </div>
  );
};

const _getDayName = (dateString, locale) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export default Day;
