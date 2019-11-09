import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Platform } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors';

const CategoriesScreen = props => {
  
  const renderGridItem = (itemData) => {
    return (
      // Ganti jadi TouchableOpacity biar bisa distyle dan dicustom
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          // For each item, give action to open CategoryMealsScreen with params
          props.navigation.navigate({routeName: "CategoryMeals", params: {
            categoryId: itemData.item.id
          }});
        }}>
        <View >
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // Flatlist 2 kolom
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
  headerStyle: {
    backgroundColor: ( Platform.OS === 'ios') ? 'white' : Colors.primaryColor
  },
  headerTintColor: ( Platform.OS === 'ios') ? Colors.primaryColor : 'white'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
      flex: 1,
      margin: 15,
      height: 150
    }
})

export default CategoriesScreen;

