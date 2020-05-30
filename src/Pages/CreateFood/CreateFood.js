import React, { useState } from "react";

import classes from "./CreateFood.module.css";
import createInput, {
  defaultRules,
  createSelect,
} from "../../Shared/createFormFields";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import ChipInput from "material-ui-chip-input";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { createFoodSchema } from "../../GraphQl/Schema/Schema";
import SubmitButton from "../../UI/Button/SubmitButton/SubmitButton";
import { authUser } from "../../Store/Actions/Index";

const CreateFood = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const [createFood, { loading: createFoodLoading }] = useMutation(
    createFoodSchema
  );
  const [networkError, setNetworkError] = useState();
  const [foodChips, setFoodChips] = useState([]);

  const formSchema = {
    name: createInput("", "foodName", "Name of the food", "", {}),
    link: createInput("", "foodLink", "link to the recipe", "", {}),
    favorite: createInput("checkbox", "favorite", "false", "", {}),
    stars: createInput("number", "rating", "", "1", {}),
    difficulty: createSelect("difficulty", ["easy", "normal", "hard"], {}),
  };

  const formElementArray = [];
  for (let key in formSchema) {
    formElementArray.push({
      id: key,
      config: formSchema[key],
    });
  }

  const onAddChipHandler = (chip) => {
    setFoodChips((prevState) => {
      prevState.push(chip);
      return prevState;
    });
  };

  const onDeleteChipHandler = (index) => {
    setFoodChips((prevState) => {
      prevState.splice(index, 1);
      return prevState;
    });
  };

  let form = formElementArray.map((element) => {
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

  const onSubmitHandler = ({
    foodName,
    foodLink,
    favorite,
    rating,
    difficulty,
  }) => {
    createFood({
      variables: {
        foodInput: {
          name: foodName,
          link: foodLink,
          favorite: favorite,
          rating: parseInt(rating),
          difficulty: difficulty,
          keywords: foodChips,
        },
      },
    }).catch((error) => setNetworkError(error));
  };

  return (
    <React.Fragment>
      <div className={classes.FoodForm}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {form}
          <div className={classes.ChipInput}>
            <ChipInput
              name="keywords"
              value={foodChips}
              onAdd={(chip) => {
                onAddChipHandler(chip);
              }}
              onDelete={(chip, index) => onDeleteChipHandler(index)}
            />
          </div>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </div>
      {createFoodLoading ? (
        <div className={classes.Spinner}>
          <Spinner />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default CreateFood;
