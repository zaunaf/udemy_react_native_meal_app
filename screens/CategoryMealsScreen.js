import React from 'react'
import { View, FlatList, Text, StyleSheet, Button } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealItem from '../components/MealItem';

const CategoriesMealsScreen = props => {
    // Catch passed params from caller screen
    const categoryId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
    
    // Filter meals according to the selected category
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

    // Function to render each meal item
    const renderMealItem = itemData => (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
            props.navigation.navigate({
                routeName: 'MealDetail',
                params: {
                    mealId: itemData.item.id
                }
            })
        }}
      />
    );

    return (
      <View style={styles.screen}>
        <FlatList
          style={{ width: "100%" }}
          data={displayedMeals}
          keyExtractor={(item, index) => item.id}
          renderItem={renderMealItem}       
        />
      </View>
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
})

export default CategoriesMealsScreen;
