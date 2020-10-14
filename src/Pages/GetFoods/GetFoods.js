import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getFoodsSchema } from "../../GraphQl/Schema/Schema";
import classes from "../GetFoods/GetFoods.module.css";
import FoodSelection from "../../UI/FoodSelection/FoodSelection";
import QueryComponent from "../../UI/QueryComponent/QueryComponent";

const GetFoods = () => {
  const [getFoods, { loading, data }] = useLazyQuery(getFoodsSchema);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    getFoods({ variables: { page: page } });
  }, [page, getFoods]);

  useEffect(() => {
    if (data) {
      setFoodArray(data.getFoods.foods);
      setTotalPages(data.getFoods.totalPages);
    }
  }, [setFoodArray, setTotalPages, data]);

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

  const nextPageHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  const prevPageHandler = () => {
    setPage((prevState) => prevState - 1);
  };

  return (
    <React.Fragment>
      <div className={classes.QuerySearch}>
        <QueryComponent submitHandler={onSubmitHandler}/>
      </div>
      <div className={classes.Content}>
        <FoodSelection
            loading={loading}
            foods={foodArray}
            page={page}
            totalPages={totalPages}
            prevPageHandler={prevPageHandler}
            nextPageHandler={nextPageHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default GetFoods;
