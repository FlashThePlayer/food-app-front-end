import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getFoodsSchema } from "../../GraphQl/Schema/Schema";
import classes from "../GetFoods/GetFoods.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import FoodItem from "../../UI/FoodItem/FoodItem";
import Pageination from "../../UI/Pageniation/Pageination";
import { useForm } from "react-hook-form";
import createInput, { createSelect } from "../../Shared/createFormFields";
import SubmitButton from "../../UI/Button/SubmitButton/SubmitButton";
import {createQueryFormFromSchema} from "../../Shared/createQueryFormFromSchema";

const GetFoods = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
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

  const queryFormSchema = {
    name: createInput("", "foodName", "Name of the food", "", {}),
    favorite: createInput("checkbox", "favorite", "false", "", {}),
    stars: createInput("number", "rating", "", "1", {}),
    difficulty: createSelect("difficulty", ["easy", "normal", "hard"], {}),
  };

  let queryForm = createQueryFormFromSchema(queryFormSchema, errors, register)

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

  let foodList;
  let pages;

  if (loading) {
    foodList = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
  } else {
    foodList = foodArray.map((food, index) => {
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
    pages = (
      <Pageination
        currentPage={page}
        maxPages={totalPages}
        prevPage={prevPageHandler}
        nextPage={nextPageHandler}
      />
    );
  }

  if (foodList.length === 0) {
    foodList = (
      <div className={classes.NoFoodBanner}>
        <p>Create some food already!</p>
      </div>
    );
    pages = null;
  }

  return (
    <React.Fragment>
      <div className={classes.QuerySearch}>
        <form className={classes.QueryForm} onSubmit={handleSubmit(onSubmitHandler)}>
          {queryForm}
          <SubmitButton>Search</SubmitButton>
        </form>
      </div>
      <div className={classes.Content}>
        {foodList}
        {pages}
      </div>
    </React.Fragment>
  );
};

export default GetFoods;
