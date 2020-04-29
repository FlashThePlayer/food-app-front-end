import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import classes from "./Authentication.module.css";
import createInput, { defaultRules, patternRules } from "../shared/createInput";
import Input from "../UI/Input/Input";
import { createUserSchema } from "../GraphQl/Schema/Schema";
import Modal from "../UI/Modal/Modal";

const Authentication = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const [createUser, { data }] = useMutation(
    createUserSchema
  );
  const [networkError, setNetworkError] = useState();

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

  const onSubmitHandler = ({ name, email, password }) => {
    createUser({
      variables: {
        userInput: { name: name, email: email, password: password },
      },
    }).catch((error) => {
      setNetworkError(error);
    });
  };

  const clearNetworkErrorHandler = () => {
    console.log(networkError)
    setNetworkError(null);
  };

  let errorMessage = null;

  if (networkError) {
    errorMessage = (
      <Modal show={networkError} modalClosed={clearNetworkErrorHandler}>
        <p>There seems to be a problem with our Authentication server, try again later!</p>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {errorMessage}
      <div className={classes.Auth}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {form}
          <button className={classes.Button} type="submit">
            submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Authentication;
