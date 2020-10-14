import React from "react";
import classes from "./QueryComponent.module.css"
import SubmitButton from "../Button/SubmitButton/SubmitButton";
import createInput, { createSelect } from "../../Shared/createFormFields";
import { useForm } from "react-hook-form";
import { createQueryFormFromSchema } from "../../Shared/createQueryFormFromSchema";

const QueryComponent = ({ submitHandler }) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });

  const queryFormSchema = {
    name: createInput("", "foodName", "Name of the food", "", {}),
  };

  const expendedQueryFormSchema = {
    favorite: createInput("checkbox", "favorite", "false", "", {}),
    stars: createInput("number", "rating", "", "1", {}),
    difficulty: createSelect("difficulty", ["easy", "normal", "hard"], {}),
  };

  let queryForm = createQueryFormFromSchema(
      queryFormSchema,
      errors,
      register
  );
  let extendedQueryForm = createQueryFormFromSchema(
    expendedQueryFormSchema,
    errors,
    register
  );

  return (
    <div className={classes.QueryForm}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>{queryForm}</div>
        <div>{extendedQueryForm}</div>
        <SubmitButton>Search</SubmitButton>
      </form>
    </div>
  );
};

export default QueryComponent;