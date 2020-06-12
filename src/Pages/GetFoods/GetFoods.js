import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { getFoodsSchema } from "../../GraphQl/Schema/Schema";
import classes from "../GetFoods/GetFoods.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import FoodItem from "../../UI/FoodItem/FoodItem";
import Pageination from "../../UI/Pageniation/Pageination";
import { useForm } from "react-hook-form";
import createInput, { createSelect } from "../../Shared/createFormFields";
import Input from "../../UI/Input/Input";
import SubmitButton from "../../UI/Button/SubmitButton/SubmitButton";

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

  const formElementArray = [];
  for (let key in queryFormSchema) {
    formElementArray.push({
      id: key,
      config: queryFormSchema[key],
    });
  }

  let queryForm = formElementArray.map((element) => {
    return (
      <Input
        formReference={register(element.config.rules)}
        key={element.id}
        label={element.id}
        elementType={element.config.elementType}
        error={errors[element.id]}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
      />
    );
  });

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
      <div className={classes.QueryForm}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {queryForm}
          <SubmitButton>Search</SubmitButton>
        </form>
      </div>
      {foodList}
      {pages}
    </React.Fragment>
  );
};

export default GetFoods;
