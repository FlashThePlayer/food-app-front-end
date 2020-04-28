import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import classes from "./Authentication.module.css";
import createInput, { defaultRules, patternRules } from "../shared/createInput";
import Input from "../UI/Input/Input";

const Authentication = (props) => {
  const { register, handleSubmit, errors } = useForm({mode: "onBlur"});

  const inputSchemas = {
    email: createInput("input", "email", "Email Address", "", {
      ...defaultRules,
      pattern: patternRules("email"),
    }),
    password: createInput("input", "password", "Password", "", {
      ...defaultRules,
      pattern: patternRules("password"),
    }),
    name: createInput("input", "name", "Your name", "", { ...defaultRules }),
  };

  const formElementArray = [];
  for (let key in inputSchemas) {
    formElementArray.push({
      id: key,
      config: inputSchemas[key],
    });
  }

  let form = formElementArray.map((element) => {
    return (
      <Input
        fromReference={register(element.config.rules)}
        key={element.id}
        label={element.id}
        elementType={element.config.elementType}
        error={errors[element.id]}
        elementConfig={element.config.elementConfig}
      />
    );
  });

  const onSubmitHandler = (data) => {
    // do stuff here
  };

  return (
    <div className={classes.Auth}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {form}
        <button className={classes.Button} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Authentication;
