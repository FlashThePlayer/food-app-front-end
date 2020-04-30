import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import classes from "./Authentication.module.css";
import createInput, { defaultRules, patternRules } from "../shared/createInput";
import Input from "../UI/Input/Input";
import { createUserSchema, loginUserSchema } from "../GraphQl/Schema/Schema";
import Modal from "../UI/Modal/Modal";
import ToggleButton from "../UI/Button/ToggleButton/ToggleButton";
import SubmitButton from "../UI/Button/SubmitButton/SubmitButton";
import Spinner from "../UI/Spinner/Spinner";

const Authentication = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const [
    createUser,
    { data: createUserData, loading: signUpLoading },
  ] = useMutation(createUserSchema);
  const [
    loginUser,
    { data: loginUserData, loading: signInLoading },
  ] = useMutation(loginUserSchema);
  const [isSignUp, setIsSignUp] = useState(false);
  const [networkError, setNetworkError] = useState();

  const signUpSchema = {
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

  const signInSchema = {
    email: createInput("input", "email", "Email Address", "", {
      validate: false,
    }),
    password: createInput("input", "password", "Password", "", {
      validate: false,
    }),
  };

  let formSchema = isSignUp ? signUpSchema : signInSchema;

  const formElementArray = [];
  for (let key in formSchema) {
    formElementArray.push({
      id: key,
      config: formSchema[key],
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

  const onSubmitHandler = ({ email, password, name }) => {
    if (isSignUp) {
      createUser({
        variables: {
          userInput: { name: name, email: email, password: password },
        },
      }).catch((error) => {
        setNetworkError(error);
      });
    } else {
      loginUser({
        variables: { userInput: { email: email, password: password } },
      }).catch((errors) => setNetworkError(errors));
    }
  };

  const formLogicHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const clearNetworkErrorHandler = () => {
    setNetworkError(null);
  };

  let errorMessage = null;

  if (networkError) {
    errorMessage = (
      <Modal show={networkError} modalClosed={clearNetworkErrorHandler}>
        <p>
          There seems to be a problem with our Authentication server, try again
          later!
        </p>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {errorMessage}
      <div className={classes.Auth}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {form}
          <SubmitButton>Submit</SubmitButton>
        </form>
      </div>
      {signInLoading || signUpLoading ? <Spinner /> : null}
      <div className={classes.SwitchButton}>
        <ToggleButton clicked={formLogicHandler} />
      </div>
    </React.Fragment>
  );
};

export default Authentication;
