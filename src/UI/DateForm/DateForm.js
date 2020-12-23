import React from "react";
import { useForm } from "react-hook-form";
import createInput, { patternRules } from "../../Shared/createFormFields";
import { createQueryFormFromSchema } from "../../Shared/createQueryFormFromSchema";
import classes from "./DateForm.module.css";

const DateForm = ({ submitHandler, year, month, day }) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });

  const dateFormSchema = {
    year: createInput("number", "year", year, "1", {
      required: { value: true, message: "Field is required" },
      pattern: patternRules("year"),
    }),
    month: createInput("number", "month", month, "2020", {
      required: { value: true, message: "Field is required" },
      pattern: patternRules("month"),
    }),
    day: createInput("number", "day", day, "1", {
      required: { value: true, message: "Field is required" },
      pattern: patternRules("day"),
    }),
  };

  let dateForm = createQueryFormFromSchema(dateFormSchema, errors, register);

  return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.DateForm}>
          {dateForm}
          <button className={classes.SubmitButton} type={"submit"}>
            GO
          </button>
        </div>
      </form>
  );
};

export default DateForm;
