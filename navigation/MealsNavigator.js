import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";



import Colors from "../constants/Colors";

// Repetitive, so better reuse it
const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTintColor:
    Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const FavNavigator = createStackNavigator({
  Favourites: FavouritesScreen,
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: defaultStackNavigationOptions
})

// Buat Tab Navigator. MealsNavigator menjadi anggotanya
const tabScreenConfig =   {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      }
    }
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      }
    }
  }
  
};

const MealsFavTabNavigator = Platform.OS === 'android' ? 
  createMaterialBottomTabNavigator(
    tabScreenConfig,
    {
      activeColor: "white",
      shifting: true,
      barStyle: {
        backgroundColor: Colors.accentColor
      }
    }
  ) 
  : 
  createBottomTabNavigator(
    tabScreenConfig, 
    {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    }
  )
;

export default createAppContainer(MealsFavTabNavigator);