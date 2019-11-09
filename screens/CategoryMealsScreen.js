import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const CategoriesMealsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Category Meals Screen</Text>
            <Button title="Go to Meal Detail" onPress={() => {
                props.navigation.navigate('MealDetailScreen');
            }} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoriesMealsScreen;

