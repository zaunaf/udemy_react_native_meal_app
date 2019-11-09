---
title: Meal App
sideTitle: Meal App
---

Initialize dulu aplikasi baru.

Kita buat folder `screens` kemudian kita tambahkan semua screen.
```
CategoriesScreen.js
CategoryMealsScreen.js
FavouritesScreen.js
FiltersScreen.js
MealDetailScreen.js
```

Berikut code-code boilerplatenya:

```js
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  // State management for Assets and Fonts Loading
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
```

CategoriesScreen.js
```js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CategoriesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Categories</Text>
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

export default CategoriesScreen;
```

CategoryMealsScreen.js
```js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CategoriesMealsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Category Meals Screen</Text>
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
```

FavouritesScreen.js
```js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FavouritesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Favourites Screen</Text>
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

export default FavouritesScreen;
```

FiltersScreen.js
```js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FiltersScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Filters Screen</Text>
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

export default FiltersScreen;
```

MealDetailScreen.js
```js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MealDetailScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Meal Detail Screen</Text>
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

export default MealDetailScreen;
```


## Install React Navigation

Di aplikasi Game App, kita tidak menggunakan navigasi. Tapi umumnya aplikasi bisnis kita punya mekanisme navigasi.
Kita coba gunakan. Instal dulu:

```bash
npm install --save react-navigation-stack
npm install --save react-navigation
expo install react-native-gesture-handler react-native-reanimated
```

Kita buat `MealsNavigator.js`:

```js
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'


const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetailScreen: MealDetailScreen
});

export default createAppContainer(MealsNavigator);
```

Untuk mensimulasikan pemanggilan navigasi, kita tambahkan di CategoriesScreen.js:
```js
...
import { View, Text, StyleSheet, Button } from 'react-native'

const CategoriesScreen = props => {
    
    // Kita coba cek props yang sudah ditambahi navigation
    console.log(props);

    return (
        <View style={styles.screen}>
            <Text>Categories</Text>
            {/* Kita test navigation pakai Button */}
            <Button title="Go to meals" onPress={() => {
                props.navigation.navigate('CategoryMeals');
            }} />
        </View>
    );
};
```

Dan di `CategoryMeals.js` kita tambahkan juga tombol:
```js
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
```

Maka hasilnya
=gambar=

Inilah hasilnya navigasi.


## Push

Perbedaan push dan navigate adalah, bahwa jika kita gunakan push, kita menggunakan ulang screen yang sama.
Kasus contohnya adalah misal kita membuat folder browser semacam dropbox. Misalnya:
```js
props.navigation.push('SubFolder');
```

## Custom Back Button

Kenapa gak pakai button `Back` bawaan aja? Ya bisa aja misal kita ingin user melakukan save sekaligus kita back.
Contohnya kita tambahkan di `MealDetailScreen.js`:
```js
            <Button title="Save and Go Back" onPress={()=> {
                props.navigation.goBack();
            }}/>
```
Jika kita menggunakan `push`, kita juga bisa gunakan `pop` untuk go back.
```js
props.navigation.pop();
```

Ada juga `popToTop` untuk langsung ke root screen:
```js
props.navigation.popToTop();
```

Nah satu lagi yang bisa dipakai, namanya `replace`. 
Replace ini menggantikan current screen. Konsekuensinya gak ada root screen
sehingga kalau user meng-close screen ini, aplikasi juga tertutup. 
Contohnya yg seperti ini misal login screen.

```js
props.navigation.replace('MainScreen');
```

## Membuat Flatlist Grid

Kita mulai coba menampilkan data menggunakan flatlist grid. Ubah `CategoriesScreen.js` jadi begini:
```js
import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Platform } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors';
const CategoriesScreen = props => {
  
  const renderGridItem = (itemData) => {
    return (
        <View style={styles.gridItem}>
          <Text>{itemData.item.title}</Text>
        </View>
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
```
Sudah mulai muncul daftarnya.


## Melink Navigasi

Kita ubah jadi `<TouchableOpacity>` dengan onPress, kirim params dll. Pindahkan juga stylenya:
```js
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
```

## Mengcostumize Screen Berikutnya

Ok sekarang kita tangkap parameter yang dikirimkan tadi:

```js
import { CATEGORIES } from '../data/dummy-data'

const CategoriesMealsScreen = props => {
    // Catch passed params from caller screen
    const categoryId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
```
Dan kita tampilkan:
```js
    return (
        <View style={styles.screen}>
            <Text>Category Meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
```
Ok sudah lumayan. Tapi agak jelek ya gak muncul di title. Kita gunakan lagi navigationOptions.
Namun sayangnya Code ini ada di luar class, akibatnya kita tidak bisa memasukkan selectedCategory tadi.
Tapi tenang ada solusinya, navigationOptions ini ternyata bisa jadi fungsi juga dengan parameter navigationData..
Coba kita tambahkan `console.log(navigationData)` di situ. 
```js
CategoriesMealsScreen.navigationOptions = navigationData => {
    // Cek console jika ingin tahu apa saja
    console.log(navigationData);
```
Jika kita jalankan hasilnya di console:
```js
Object {
  "navigation": Object {
    "actions": Object {
      "dismiss": [Function dismiss],
      "goBack": [Function goBack],
      "navigate": [Function navigate],
      "pop": [Function pop],
      "popToTop": [Function popToTop],
      "push": [Function push],
      "replace": [Function replace],
      "reset": [Function reset],
      "setParams": [Function setParams],
    },
    "addListener": [Function addListener],
    "dangerouslyGetParent": [Function anonymous],
    "dismiss": [Function anonymous],
    "dispatch": [Function anonymous],
    "emit": [Function emit],
    "getChildNavigation": [Function getChildNavigation],
    "getParam": [Function anonymous],
    "getScreenProps": [Function anonymous],
    "goBack": [Function anonymous],
    "isFirstRouteInParent": [Function isFirstRouteInParent],
    "isFocused": [Function isFocused],
    "navigate": [Function anonymous],
    "pop": [Function anonymous],
    "popToTop": [Function anonymous],
    "push": [Function anonymous],
    "replace": [Function anonymous],
    "reset": [Function anonymous],
    "router": undefined,
    "setParams": [Function anonymous],
    "state": Object {
      "key": "id-1573327216215-1",
      "params": Object {
        "categoryId": "c3",
      },
      "routeName": "CategoryMeals",
    },
  },
  "navigationOptions": Object {},
  "screenProps": Object {},
  "theme": "light",
}
```
Berarti pada fungsi itu bisa navigasi bisa dimainkan.
Kita mainkan:

```js
CategoriesMealsScreen.navigationOptions = navigationData => {
    // Cek console jika ingin tahu apa saja
    console.log(navigationData);
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        headerTitle: selectedCategory.title,
        headerStyle: {
            backgroundColor: ( Platform.OS === 'ios') ? 'white' : Colors.primaryColor
        },
        headerTintColor: ( Platform.OS === 'ios') ? Colors.primaryColor : 'white'
    }
};
```
Begitu caranya.

## Mengurangi Repeating Ourself ketika Styling Header

Kita barusan copas style2 header agar tiap screen sama. Gak bener ini, melanggar DRY.
Kita rapikan. Kita hapus blok `CategoriesScreen.navigationOptions` di `CategoriesScreen.js`,
kita pindahkan sebagian isinya ke `MealsNavigation.js` seperti ini:

```js
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetailScreen: {
        screen: MealDetailScreen
    },
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: ( Platform.OS === 'ios') ? 'white' : Colors.primaryColor
        },
        headerTintColor: ( Platform.OS === 'ios') ? Colors.primaryColor : 'white'      
    }
});
```
Yang artinya tiap navigation bisa disetting di sini, dan praktisnya, ada defaultNavigationOptions di mana
setting2 yang sama setiap screen bisa kita atur di sini.

Silakan juga hilangkan kode serupa di `CategoryMealsScreen.js`.

## Optimize Screen

Untuk meningkatkan performa screen, kita gunakan `react-native-screens`.
Sekarang kita install dulu. Mungkin sudah terpaket, tapi tidak ada salahnya dijalankan siapa tahu belum.
```
npm install --save react-native-screens
```
Cara pakainya simpel. Di `App.js` kita tambahkan sesudah semua import dan sebelum code apapun dimulai:
```js
import { useScreens } from 'react-native-screens';
...
useScreens();
```

## Grid Styling and Optimizing

Kita buat file baru, `components/CategoryGridTile.js`, isinya memindahkan sebagian dari `CategoriesScreen.js`
dengan sambil mengambil parameters/props dari screen yang menggunakannya:

```js
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
```

Kita ubah juga `CategoriesScreen.js` membuatnya menjadi lebih ramping:
```js
import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
  
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={() => {
        // For each item, give action to open CategoryMealsScreen with params
        props.navigation.navigate({
          routeName: "CategoryMeals",
          params: {
            categoryId: itemData.item.id
          }
        });
      }}/>
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoriesScreen;


```