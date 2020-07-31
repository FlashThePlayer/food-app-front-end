import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import classes from "./Authentication.module.css";
import Modal from "../UI/Modal/Modal";
import ToggleButton from "../UI/Button/ToggleButton/ToggleButton";
import SubmitButton from "../UI/Button/SubmitButton/SubmitButton";
import Spinner from "../UI/Spinner/Spinner";
import createFormFields, {
  defaultRules,
  patternRules,
} from "../Shared/createFormFields";
import { createUserSchema, loginUserSchema } from "../GraphQl/Schema/Schema";
import { authUser } from "../Store/Actions/Index";
import {createQueryFormFromSchema} from "../Shared/createQueryFormFromSchema";

const Authentication = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const [createUser, { loading: signUpLoading }] = useMutation(
    createUserSchema
  );
  const [loginUser, { loading: signInLoading }] = useMutation(loginUserSchema);
  const [isSignUp, setIsSignUp] = useState(false);
  const [networkError, setNetworkError] = useState();

  const signUpSchema = {
    email: createFormFields("email", "email", "Email Address", "", {
      ...defaultRules,
      pattern: patternRules("email"),
    }),
    password: createFormFields("password", "password", "Password", "", {
      ...defaultRules,
      pattern: patternRules("password"),
    }),
    name: createFormFields("name", "name", "Your name", "", {
      ...defaultRules,
    }),
  };

  const signInSchema = {
    email: createFormFields("email", "email", "Email Address", "", {
      validate: false,
    }),
    password: createFormFields("password", "password", "Password", "", {
      validate: false,
    }),
  };

  let formSchema = isSignUp ? signUpSchema : signInSchema;

  const form = createQueryFormFromSchema(formSchema, errors, register)

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
      })
        .then((response) => {
          dispatch(authUser(response.data.loginUser, email, props.history));
        })
        .catch((errors) => {
          setNetworkError(errors);
        });
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
      {signInLoading || signUpLoading ? (
        <div className={classes.Spinner}>
          <Spinner />
        </div>
      ) : null}
      <div className={classes.SwitchButton}>
        <ToggleButton clicked={formLogicHandler} />
      </div>
    </React.Fragment>
  );
};

export default Authentication;
