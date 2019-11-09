import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, View, Text, StyleSheet, Platform } from "react-native";

const CategoryGridTile = props => {

  // Add Platform check to enable ripple effect on android
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    // Ganti jadi TouchableOpacity biar bisa distyle dan dicustom
    <View style={styles.gridItem}>
    <TouchableComponent
      style={{flex: 1}}
      onPress={props.onPress}>
      <View style={{ ...styles.tileContainer, ...{backgroundColor: props.color} }}>
        <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
      </View>
    </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
      flex: 1,
      margin: 15,
      height: 150
  },
  tileContainer: {
      flex: 1,
      borderRadius: 10,      
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 10,
      elevation: 3,
      padding: 15,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});

export default CategoryGridTile;