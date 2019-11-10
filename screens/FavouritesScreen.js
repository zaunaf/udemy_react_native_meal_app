import React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";

const FavouritesScreen = props => {

  // Filter meals according to the selected category
  const favMeals = MEALS.filter(
    meal => meal.id === 'm3' || meal.id === 'm4'
  );

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Favourites"
  };
};

export default FavouritesScreen;
