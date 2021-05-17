import React, { useEffect, useReducer, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import classes from "./Days.module.css";
import {
  getDaysSchema,
  patchDaySchema,
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
import { SIZE } from "../../UI/FoodItem/SizeConstants";

import { moveInArray } from "../../Shared/util";

const Days = (props) => {
  const [patchDay, error] = useMutation(patchDaySchema);
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
      const days = _populateDaysWithData(getDaysData.getDays);
      setWeekState({ days: days, date: dateState });
    }
  }, [dateState, getDaysData]);

  useEffect(() => {
    if(error) {
      console.log(error)
    }
  }, [error])

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
    const patchDayInput = _handlePatchDay(source, destination, foodArray, weekState.days);
    patchDay(patchDayInput)
      .then(({ data }) => {
        setWeekState((prevState) => {
          const dayArray = [...prevState.days];
          const updatedDayArray = _updateDayArrayWithReturnedDay(
            data.patchDay,
            dayArray
          );
          return { days: updatedDayArray, date: dateState };
        });
      })
      .catch((err) => console.log(err));
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
            size={SIZE.MID}
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

const _handlePatchDay = (source, destination, foods, days) => {
  const whichCase = _checkWhichCase(source, destination);
  let dayInputs;

  switch (whichCase) {
    case "ADD":
      dayInputs = [_addFoodToDay(source, destination, foods, days)];
      break;
    case "DELETE":
      dayInputs = [_deleteFoodFromDay(source, days)];
      break;
    case "REORDER":
      dayInputs = [_reorderFoodFromDay(source, destination, days)];
      break;
    case "MOVE_BETWEEN_DAYS":
      dayInputs = _moveFoodBetweenDays(source, destination, foods, days);
      break;
  }

  return { variables: { dayInputs: dayInputs } };
};

const _addFoodToDay = (source, destination, foods, days) => {
  const foodIndex = source.index;
  const destinationIndex = destination.index;
  const day = days.find((day) => day.droppableId === destination.droppableId);
  const foodId = foods[foodIndex]._id;
  const foodIds = day.meals.map((food) => food._id);
  // with splice and des. Index the use can place the food where he wants instead only at the end
  foodIds.splice(destinationIndex, 0, foodId);
  return _createPatchDayInput(day.date, foodIds);
};

const _deleteFoodFromDay = (source, days) => {
  const foodIndex = source.index;
  const day = days.find((day) => day.droppableId === source.droppableId);
  const foodIds = day.meals.map((food, index) => {
      if (index !== foodIndex) {
        return food._id;
      }
  }).filter((el) => el != null);
  return _createPatchDayInput(day.date, foodIds);
};

const _reorderFoodFromDay = (source, destination, days) => {
  const foodStartIndex = source.index;
  const foodEndIndex = destination.index;
  const day = days.find((day) => day.droppableId === source.droppableId);
  const meals = moveInArray(day.meals, foodStartIndex, foodEndIndex);
  const foodIds = meals.map((food) => food._id);
  return _createPatchDayInput(day.date, foodIds);
};

const _moveFoodBetweenDays = (source, destination, foods, days) => {
  const returnValue = [];
  returnValue.push(_deleteFoodFromDay(source, days));

  const sourceIndex = source.index;
  const sourceDay = days.find((day) => day.droppableId === source.droppableId);

  const destinationIndex = destination.index;
  const destinationDay = days.find((day) => day.droppableId === destination.droppableId);

  const movedFoodId = sourceDay.meals.map((food, index) => {
      if (index === sourceIndex) {
        return food._id;
      }})
      .filter((el) => el != null);

  const foodIds = destinationDay.meals.map((food) => food._id);
  foodIds.splice(destinationIndex, 0, ...movedFoodId);

  returnValue.push(_createPatchDayInput(destinationDay.date, foodIds));
  return returnValue;
};

const _createPatchDayInput = (date, foodIds) => {
  return { date: date, foodId: foodIds };
};

const _checkWhichCase = (source, destination) => {
  const destId = destination !== null ? destination.droppableId : null;
  const sourceId = source.droppableId;
  if (sourceId.startsWith("droppableDay") && destId == null) {
    return "DELETE";
  }
  if (
    sourceId.startsWith("droppableFood") &&
    destId.startsWith("droppableDay")
  ) {
    return "ADD";
  }
  if (
    sourceId !== destination.droppableId &&
    sourceId.startsWith("droppableDay") &&
    destId.startsWith("droppableDay")
  ) {
    return "MOVE_BETWEEN_DAYS";
  }

  if (sourceId === destId && sourceId.startsWith("droppableDay")) {
    return "REORDER";
  }
};

const _updateDayArrayWithReturnedDay = (dayDataArray, dayArray) => {
  dayDataArray.forEach((dayData) => {
    const replaceIndex = dayArray.findIndex((day) => day.date === dayData.date);
    const dayName = _getDayName(dayData.date, "en-EN");
    dayArray[replaceIndex] = {
      meals: dayData.meals,
      date: dayData.date,
      dayName: dayName,
      droppableId: `droppableDay-${dayName}`,
    };
  });

  return [...dayArray];
};

const _populateDaysWithData = (dayData) => {
  return dayData.map((day) => {
    const dayName = _getDayName(day.date, "en-EN");
    return {
      ...day,
      dayName: dayName,
      droppableId: `droppableDay-${dayName}`,
    };
  });
};

const _getDayName = (dateString, locale) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export default Days;
