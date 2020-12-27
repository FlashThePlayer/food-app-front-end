import React, { useState } from "react";

import classes from "./CreateFood.module.css";
import createInput, {
  createTextarea,
  defaultRules,
  createSelect,
} from "../../Shared/createFormFields";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import ChipInput from "material-ui-chip-input";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { createFoodSchema } from "../../GraphQl/Schema/Schema";
import SubmitButton from "../../UI/Button/SubmitButton/SubmitButton";
import Modal from "../../UI/Modal/Modal";

const CreateFood = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const [
    createFood,
    { loading: createFoodLoading, data: foodData },
  ] = useMutation(createFoodSchema);
  const [networkError, setNetworkError] = useState();
  const [foodName, setFoodName] = useState();
  const [foodChips, setFoodChips] = useState([]);

  const formSchema = {
    name: createInput("", "foodName", "Name of the food", "", {}),
    link: createInput("", "foodLink", "link to the recipe", "", {}),
    pictureLink: createInput("", "pictureLink", "link to the picture", "", {}),
    textArea: createTextarea(5, 5, "recipe", "your recipe goes here", "", {}),
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

  const onSubmitHandler = ({foodName, foodLink, pictureLink, favorite, rating, difficulty, recipe }) => {
    createFood({
      variables: {
        foodInput: {
          name: foodName,
          link: foodLink,
          pictureLink: pictureLink,
          favorite: favorite,
          rating: parseInt(rating),
          difficulty: difficulty,
          keywords: foodChips,
          recipe: recipe
        },
      },
    })
      .then(({data}) => {
        setFoodName(data.createFood.name);
      })
      .catch((error) => setNetworkError(error));
  };

  const clearFoodNameHandler = () => {
    setFoodName(null);
    window.location.reload(true); // dunno if this is really good though, cant empty form state
  };

  let successFoodCreated = null;

  if (foodName) {
    successFoodCreated = (
        <Modal show={foodName} modalClosed={clearFoodNameHandler}>
          <p>
            {foodName} was created successfully!
          </p>
        </Modal>
    );
  }

  return (
    <React.Fragment>
      {successFoodCreated}
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
