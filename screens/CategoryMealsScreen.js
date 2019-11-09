import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'

const CategoriesMealsScreen = props => {
    // Catch passed params from caller screen
    const categoryId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
    
    return (
        <View style={styles.screen}>
            <Text>Category Meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Meal Detail" onPress={() => {
                props.navigation.navigate('MealDetailScreen');
            }} />
        </View>
    )
};

// Code ini ada di luar class, akibatnya kita tidak bisa memasukkan selectedCategoris
// Tapi ada solusinya, navigationOptions ini ternyata bisa jadi fungsi juga dengan parameter navigationData
CategoriesMealsScreen.navigationOptions = navigationData => {
    // Cek console jika ingin tahu apa saja
    console.log(navigationData);
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
        alignItems: 'center'
    }
})

export default CategoriesMealsScreen;

