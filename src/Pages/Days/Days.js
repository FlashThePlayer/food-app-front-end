import React, { useEffect, useReducer, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import classes from "./Days.module.css";
import {
  getDaysSchema,
  createDaysSchema,
  getFoodsSchema,
} from "../../GraphQl/Schema/Schema";
import QueryComponent from "../../UI/QueryComponent/QueryComponent";
import FoodSelection from "../../UI/FoodSelection/FoodSelection";
import {
  pageIncrement,
  pageDecrement,
  totalPages,
} from "../../Context/Actions";
import { pageReducer } from "../../Context/Reducer";
import Week from "../../UI/Week/Week";
import { DragDropContext } from "react-beautiful-dnd";

const Days = (props) => {
  const [
    getDays,
    { loading: getDaysIsLoading, data: getDaysData },
  ] = useLazyQuery(getDaysSchema);
  const [
    createDays,
    { loading: createDaysIsLoading, data: createDaysData },
  ] = useLazyQuery(createDaysSchema);
  const [
    getFoods,
    { loading: getFoodsIsLoading, data: getFoodsData },
  ] = useLazyQuery(getFoodsSchema);

  const [pageState, dispatch] = useReducer(pageReducer, {
    page: 1,
    totalPages: 1,
  });

  const [dateState, setDateState] = useState(new Date());
  const [dayState, setDayState] = useState({ days: [], date: dateState });
  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    getDays({ variables: { date: dateState } });
  }, [dateState, getDays]);

  useEffect(() => {
    getFoods({ variables: { page: pageState.page } });
  }, [getFoods, pageState.page]);

  useEffect(() => {
    if (getFoodsData) {
      setFoodArray(getFoodsData.getFoods.foods);
      dispatch(totalPages(getFoodsData.getFoods.totalPages));
    }
  }, [setFoodArray, dispatch, getFoodsData]);

  useEffect(() => {
    if (getDaysData) {
      setDayState({ days: getDaysData.getDays, date: dateState });
    }
  }, [dateState, getDaysData]);

  const onSubmitHandler = ({ foodName, favorite, rating, difficulty }) => {
    getFoods({
      variables: {
        query: {
          name: foodName,
          favorite: favorite,
          rating: parseInt(rating),
          difficulty: difficulty,
        },
      },
    });
  };

  const onFoodDragEndHandler = () => {
    console.log("jep worked");
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onFoodDragEndHandler}>
        <div className={classes.FoodSection}>
          <QueryComponent submitHandler={onSubmitHandler}></QueryComponent>
          <FoodSelection
            loading={getFoodsIsLoading}
            foods={foodArray}
            page={pageState.page}
            totalPages={pageState.totalPages}
            prevPageHandler={() => dispatch(pageDecrement())}
            nextPageHandler={() => dispatch(pageIncrement())}
          />
        </div>
        <div className={classes.DaysSection}>
          <Week
            year={dayState.date.getFullYear()}
            month={dayState.date.toLocaleString("default", { month: "long" })}
            loading={getDaysIsLoading}
            days={dayState.days}
          />
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default Days;
