import React, { useEffect, useReducer, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import classes from "./Days.module.css";
import {
  getDaysSchema,
  createDaySchema,
  deleteFoodFromDaySchema,
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
import DateForm from "../../UI/DateForm/DateForm";

const Days = (props) => {
  const [createDay] = useMutation(createDaySchema);
  const [deleteDay] = useMutation(deleteFoodFromDaySchema);
  const [
    getDays,
    { loading: getDaysIsLoading, data: getDaysData },
  ] = useLazyQuery(getDaysSchema, { fetchPolicy: "cache-and-network" });
  const [
    getFoods,
    { loading: getFoodsIsLoading, data: getFoodsData },
  ] = useLazyQuery(getFoodsSchema, { fetchPolicy: "cache-and-network" });

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

  const onQuerySubmitHandler = ({ foodName, favorite, rating, difficulty }) => {
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

  const onDateSubmitHandler = ({ year, month, day }) => {
    const date = new Date(`${year}-${month}-${day}`);
    setDateState(date);
  };

  const onFoodDragEndHandler = ({ source, destination }) => {
    if (source.droppableId.startsWith("droppableDay") && destination == null) {
      const dayInput = _getDayInputForDeleteDay(source, weekState.days);
      deleteDay({
        variables: {
          dayInput: dayInput,
        },
      })
        .then(({ data }) => {
          setWeekState((prevState) => {
            const dayArray = [...prevState.days];
            return _handleReturnedDay(data.deleteFoodFromDay, dayArray, dateState);
          });
        })
        .catch((err) => console.log(err));
    }

    if (
      source.droppableId.startsWith("droppableFood") &&
      destination.droppableId.startsWith("droppableDay")
    ) {
      const dayInput = _getDayInputForCreateDay(
        source,
        destination,
        foodArray,
        weekState.days
      );
      createDay({
        variables: {
          dayInput: dayInput,
        },
      })
        .then(({ data }) => {
          setWeekState((prevState) => {
            const dayArray = [...prevState.days];
            return _handleReturnedDay(data.createDay, dayArray, dateState);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onFoodDragEndHandler}>
        <div className={classes.FoodSection}>
          <DateForm
            submitHandler={onDateSubmitHandler}
            year={dateState.getFullYear()}
            month={dateState.getMonth() + 1}
            day={dateState.getDate()}
          />
          <QueryComponent submitHandler={onQuerySubmitHandler} />
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

const _getDayInputForCreateDay = (source, destination, foods, days) => {
  const foodIndex = source.index;
  const dayIndex = destination.droppableId.replace("droppableDay-", "");
  return _createDayInputFromIndexAndArray(foodIndex, foods, dayIndex, days);
};

const _getDayInputForDeleteDay = (source, days) => {
  const foodIndex = source.index;
  const dayIndex = source.droppableId.replace("droppableDay-", "");
  const dayDate = days[dayIndex].date;
  const day = days.find((day) => day.date === dayDate);
  return _createDayInputFromIndexAndArray(foodIndex, day.meals, dayIndex, days);
};

const _createDayInputFromIndexAndArray = (
  foodIndex,
  foodArray,
  dayIndex,
  dayArray
) => {
  const foodId = foodArray[foodIndex]._id;
  const dayDate = dayArray[dayIndex].date;

  return { date: dayDate, foodId: foodId };
};

const _handleReturnedDay = (dayData, dayArray, date) => {
  const replaceIndex = dayArray.findIndex((day) => day.date === dayData.date);
  dayArray[replaceIndex] = {
    meals: dayData.meals,
    date: dayData.date,
  };
  return { days: dayArray, date: date };
};

export default Days;
