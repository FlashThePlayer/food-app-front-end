import React, { useEffect, useReducer, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import classes from "./Days.module.css";
import {
  getDaysSchema,
  createDaySchema,
  getFoodsSchema,
} from "../../GraphQl/Schema/Schema";
import QueryComponent from "../../UI/QueryComponent/QueryComponent";
import FoodSelection from "../../UI/FoodSelection/FoodSelection";
import {
  pageIncrement,
  pageDecrement,
  totalPages,
} from "../../Context/Actions";
import { pageReducer } from "../../Context/Reducer";
import Week from "../../UI/Week/Week";
import { DragDropContext } from "react-beautiful-dnd";

const Days = (props) => {
  const [
    getDays,
    { loading: getDaysIsLoading, data: getDaysData },
  ] = useLazyQuery(getDaysSchema);
  const [
    createDay,
    { loading: createDayIsLoading, data: createDayData, error: createDayError },
  ] = useMutation(createDaySchema);
  const [
    getFoods,
    { loading: getFoodsIsLoading, data: getFoodsData },
  ] = useLazyQuery(getFoodsSchema);

  const [pageState, dispatch] = useReducer(pageReducer, {
    page: 1,
    totalPages: 1,
  });

  const [dateState, setDateState] = useState(new Date());
  const [weekState, setWeekState] = useState({ days: [], date: dateState });
  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    getDays({ variables: { date: dateState } });
  }, [dateState, getDays]);

  useEffect(() => {
    getFoods({ variables: { page: pageState.page } });
  }, [getFoods, pageState.page]);

  useEffect(() => {
    if (getFoodsData) {
      setFoodArray(getFoodsData.getFoods.foods);
      dispatch(totalPages(getFoodsData.getFoods.totalPages));
    }
  }, [setFoodArray, dispatch, getFoodsData]);

  useEffect(() => {
    if (getDaysData) {
      setWeekState({ days: getDaysData.getDays, date: dateState });
    }
  }, [dateState, getDaysData]);

  const onSubmitHandler = ({ foodName, favorite, rating, difficulty }) => {
    getFoods({
      variables: {
        query: {
          name: foodName,
          favorite: favorite,
          rating: parseInt(rating),
          difficulty: difficulty,
        },
      },
    });
  };

  const onFoodDragEndHandler = ({ draggableId, source, destination }) => {
    if (
      source.droppableId.startsWith("droppableFood") &&
      destination.droppableId.startsWith("droppableDay")
    ) {
      const foodId = draggableId.replace("foodSelectionDraggable-", "");
      const dayNumber = destination.droppableId.replace("droppableDay-", "");
      const dayDate = weekState.days[dayNumber].date;
      createDay({
        variables: {
          dayInput: {
            date: dayDate,
            foodId: foodId,
          },
        },
      })
        .then(({ data }) => {
          setWeekState((prevState) => {
            const dayArray = [...prevState.days];
            const replaceIndex = dayArray.findIndex(
              (day) => day.date === data.createDay.date
            );
            dayArray[replaceIndex] = {
              meals: data.createDay.meals,
              date: data.createDay.date,
            };
            return { days: dayArray, date: dateState };
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onFoodDragEndHandler}>
        <div className={classes.FoodSection}>
          <QueryComponent submitHandler={onSubmitHandler}/>
          <FoodSelection
            loading={getFoodsIsLoading}
            foods={foodArray}
            page={pageState.page}
            totalPages={pageState.totalPages}
            prevPageHandler={() => dispatch(pageDecrement())}
            nextPageHandler={() => dispatch(pageIncrement())}
          />
        </div>
        <div className={classes.DaysSection}>
          <Week
            year={weekState.date.getFullYear()}
            month={weekState.date.toLocaleString("default", { month: "long" })}
            loading={getDaysIsLoading}
            days={weekState.days}
          />
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default Days;
