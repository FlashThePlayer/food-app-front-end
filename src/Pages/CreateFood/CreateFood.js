import React, {useState} from "react";

import classes from "./CreateFood.module.css";
import createInput, { defaultRules } from "../../Shared/createInput";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { useForm } from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {createFoodSchema} from "../../GraphQl/Schema/Schema";
import SubmitButton from "../../UI/Button/SubmitButton/SubmitButton";

const CreateFood = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
    const [createFood, { loading: createFoodLoading }] = useMutation(createFoodSchema);
    const [networkError, setNetworkError] = useState();


    const formSchema = {
    name: createInput("name", "Name of the food", "", {
      ...defaultRules,
    }),
    link: createInput("link", "link to the recipe", "", {
      ...defaultRules,
    }),
  };

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

    const onSubmitHandler = ({ name, link, favorite, rating, difficulty, keywords }) => {
        createFood({
                variables: {
                    foodInput: { name: name, link: link, favorite: favorite, rating: rating, difficulty: difficulty, keywords: keywords },
                },
            }).catch((error) => {
                setNetworkError(error);
            });
    };

  return (
    <React.Fragment>
      <div className={classes.FoodForm}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
              {form}
              <SubmitButton>Submit</SubmitButton>
          </form>
      </div>
        {createFoodLoading ? <div className={classes.Spinner}>
            <Spinner />
        </div> : null}
    </React.Fragment>
  );
};

export default CreateFood;
