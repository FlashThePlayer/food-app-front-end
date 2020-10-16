import React, { useEffect, useReducer, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getFoodsSchema } from "../../GraphQl/Schema/Schema";
import classes from "../GetFoods/GetFoods.module.css";
import FoodSelection from "../../UI/FoodSelection/FoodSelection";
import QueryComponent from "../../UI/QueryComponent/QueryComponent";

import {
  pageDecrement,
  pageIncrement,
  totalPages,
} from "../../Context/Actions";
import { pageReducer } from "../../Context/Reducer";

const GetFoods = () => {
  const [getFoods, { loading, data }] = useLazyQuery(getFoodsSchema);

  const [pageState, dispatch] = useReducer(pageReducer, {
    page: 1,
    totalPages: 1
  });

  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    getFoods({ variables: { page: pageState.page } });
  }, [pageState.page, getFoods]);

  useEffect(() => {
    if (data) {
      setFoodArray(data.getFoods.foods);
      dispatch(totalPages(data.getFoods.totalPages));
    }
  }, [setFoodArray, dispatch, data]);

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
      <div className={classes.QuerySearch}>
        <QueryComponent submitHandler={onSubmitHandler} />
      </div>
      <div className={classes.Content}>
        <FoodSelection
          loading={loading}
          foods={foodArray}
          page={pageState.page}
          totalPages={pageState.totalPages}
          prevPageHandler={() => dispatch(pageDecrement())}
          nextPageHandler={() => dispatch(pageIncrement())}
        />
      </div>
    </React.Fragment>
  );
};

export default GetFoods;
