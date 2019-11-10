import React from 'react'
import { StyleSheet } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealList from '../components/MealList';

const CategoriesMealsScreen = props => {
  // Catch passed params from caller screen
  const categoryId = props.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
      
  // Filter meals according to the selected category
  const listData = MEALS.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );

  return (
    // Removed to be reused in meallist
    // Pass data and props.navigation so that list items can be clicked to navigate
    <MealList listData={listData} navigation={props.navigation} />
  );
};

// Code ini ada di luar class, akibatnya kita tidak bisa memasukkan selectedCategoris
// Tapi ada solusinya, navigationOptions ini ternyata bisa jadi fungsi juga dengan parameter navigationData
CategoriesMealsScreen.navigationOptions = navigationData => {
    
    // Cek console jika ingin tahu apa saja
    // console.log(navigationData);

    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        headerTitle: selectedCategory.title
    }
};

const styles = StyleSheet.create({

})

export default CategoriesMealsScreen;
