import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { getFoodsSchema } from "../../GraphQl/Schema/Schema";
import classes from "../GetFoods/GetFoods.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import FoodItem from "../../UI/FoodItem/FoodItem";
import Pageination from "../../UI/Pageniation/Pageination";

const GetFoods = (props) => {
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

  const nextPageHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  const prevPageHandler = () => {
    setPage((prevState) => prevState - 1);
  };

  let foodList = null;

  if (loading) {
    foodList = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
  } else {
    foodList = foodArray.map((food) => {
      return (
        <FoodItem
          name={food.name}
          link={food.link}
          favorite={food.favorite}
          rating={food.rating}
          difficulty={food.difficulty}
        />
      );
    });
  }

  return (
    <React.Fragment>
      {foodList}
      <Pageination currentPage={page} maxPages={totalPages} prevPage={prevPageHandler} nextPage={nextPageHandler} />
    </React.Fragment>
  );
};

export default GetFoods;
