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
import {pageIncrement, pageDecrement, totalPages} from "../../Context/Actions";
import { pageReducer } from "../../Context/Reducer";

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

  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    getFoods({ variables: { page: pageState.page } });
  }, [pageState.page, getFoods]);

  useEffect(() => {
    if (getFoodsData) {
      setFoodArray(getFoodsData.getFoods.foods);
      dispatch(totalPages(getFoodsData.getFoods.totalPages));
    }
  }, [setFoodArray, dispatch, getFoodsData]);

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

  return (
    <React.Fragment>
      <div className={classes.FoodSection}>
        <QueryComponent submitHandler={onSubmitHandler} />
        <FoodSelection
          loading={getFoodsIsLoading}
          foods={foodArray}
          page={pageState.page}
          totalPages={pageState.totalPages}
          prevPageHandler={() => dispatch(pageDecrement())}
          nextPageHandler={() => dispatch(pageIncrement())}
        />
        <div></div>
      </div>
      <div className={classes.DaysSection}></div>
    </React.Fragment>
  );
};

export default Days;
