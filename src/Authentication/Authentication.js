import React, { useState } from "react";

import classes from "./Authentication.module.css";
import createInput, { defaultRules } from "../shared/createInput";
import checkValidity from "../shared/checkValidity";
import Input from "../UI/Input/Input";

const Authentication = (props) => {
  const [submitForm, setSubmitForm] = useState({
    email: createInput("input", "email", "Email Address", "", {
      ...defaultRules,
      isEmail: true,
    }),
    password: createInput("input", "password", "Password", "", {
      ...defaultRules,
      isPassword: true,
    }),
    name: createInput("input", "name", "Your name", "", { ...defaultRules }),
  });

  const formElementArray = [];
  for (let key in submitForm) {
    formElementArray.push({
      id: key,
      config: submitForm[key],
    });
  }

  const inputChangedHandler = (event, inputName) => {
    // setSubmitForm((prevSubmitForm) => {
    //   return {
    //     ...prevSubmitForm,
    //     [inputName]: {
    //       ...prevSubmitForm[inputName],
    //       value: event.target.value,
    //       valid: checkValidity(
    //         event.target.value,
    //         prevSubmitForm[inputName].rules
    //       ),
    //       touched: true,
    //     },
    //   };
    // });
    const updatedFrom = {
        ...submitForm,
        [inputName]: {
          ...submitForm[inputName],
          value: event.target.value,
          errors: checkValidity(
            event.target.value,
              submitForm[inputName].rules
          ),
          touched: true,
        }
    };

    setSubmitForm(updatedFrom);

  };

  let from = formElementArray.map((element) => {
    return (
      <Input
        key={element.id}
        label={element.id}
        elementType={element.config.elementType}
        value={element.config.value}
        errors={element.config.errors}
        touched={element.config.touched}
        elementConfig={element.config.elementConfig}
        changed={event => inputChangedHandler(event, element.id)}
      />
    );
  });

  return (
    <div className={classes.Auth}>
      <form>{from}</form>
    </div>
  );
};

export default Authentication;
