<!-- ---
title: Meal App
sideTitle: Meal App
--- -->

# Udemy React Native Course: Meal App

## Mendesain Aplikasi
Ceritanya kita membuat aplikasi resep yang terdiri dari kategori,
daftar resep sesuai kategorinya, sampai ke detil resep.

## Membuat Application Boiler Plate Code
Initialize dulu aplikasi baru.

### Membuat Screens
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


### Menambahkan React Navigation

Di aplikasi Game App, kita tidak menggunakan navigasi. Tapi umumnya aplikasi bisnis kita punya mekanisme navigasi.
Kita coba gunakan. Instal dulu:

```bash
npm install --save react-navigation-stack
npm install --save react-navigation
expo install react-native-gesture-handler react-native-reanimated
```

Kita buat `MealsNavigator.js`:

```js
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'


const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
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
                props.navigation.navigate('MealDetail');
            }} />
        </View>
    )
};
```

Maka hasilnya
=gambar=

Inilah hasilnya navigasi.


#### Push

Perbedaan push dan navigate adalah, bahwa jika kita gunakan push, kita menggunakan ulang screen yang sama.
Kasus contohnya adalah misal kita membuat folder browser semacam dropbox. Misalnya:
```js
props.navigation.push('SubFolder');
```

#### Custom Back Button

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

## Menggarap Screen Pertama: CategoriesScreen

Setelah navigasi ok, kita coba menampilkan data. Utk menampilkan data kita harus punya model dan sumber data.
Sumber datanya sekarang data dummy dulu, karena di tahap ini kita belum ada server2an. Di sini kita gunakan FlatList

### Membuat File Model
Buat `models/category.js`, isinya:
```js
class Category {
    constructor(id, title, color) {
        this.id = id;
        this.title = title
        this.color = color
    }
}

export default Category;
```

### Mengaitkan Data Dummy
Datanya kita buat di `data/dummy-data.js`, sourcenya bisa diambil di sini:
https://gist.github.com/zaunaf/0ce0e566d2a831ee3e7071515e937f9c

### Menampilkan Data
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
Kalau kita save dan cek di emulator seharusnya sudah mulai muncul daftarnya walaupun masih sederhana.

### Melink-kan Navigasi

Sebelumnya kita pake tombol utk navigate, kita ubah navigasi menjadi tampilan data yang bisa di-press.
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

## Mengorganisasi Navigation Headers & Styles

Sekarang kita melipir membahas navigasi.

Kita masuk ke screen berikutnya, `CategoriesMealsScreen.js`.
Screen ini tampil diklik dari screen sebelumnya, `CategoriesScreen`.

Kita tangkap parameter yang dikirimkan dari `CategoriesScreen` tadi:

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
Ok sudah lumayan. Tapi agak jelek ya, dan gak muncul di title. Kita gunakan lagi navigationOptions.

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

### Mengurangi Repeating Ourself ketika Styling Header

Kita barusan copas style2 header agar tiap screen sama. Gak bener ini, melanggar DRY.
Kita rapikan. Kita hapus blok `CategoriesScreen.navigationOptions` di `CategoriesScreen.js`,
kita pindahkan sebagian isinya ke `MealsNavigation.js` seperti ini:

```js
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

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
    // initialRouteName: 'Categories',
    defaultNavigationOptions: { 
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

export default createAppContainer(MealsNavigator);
```
Yang artinya tiap navigation bisa disetting di sini, dan praktisnya, ada defaultNavigationOptions di mana
setting2 yang sama setiap screen bisa kita atur di sini.

Silakan juga hilangkan kode serupa di `CategoryMealsScreen.js`.

### Optimizing Screen

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

## Mempercantik Tampilan Categories

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

// NavigationOptions dihapus, dipindah ke MealsNavigator.js

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


## Styling Second Screen: CategoryMealsScreen

Layar kedua ini isinya daftar meals sesuai dengan kategori yang dipilih di layar pertama.
Dia menampilkan setiap meals dengan datanya yang lengkap serta gambar.

### Linking Data
Setelah masuk kita link datanya. Buat modelnya dulu:
```js
class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id,
    this.categoryIds = categoryIds,
    this.title = title,
    this.affordability = affordability,
    this.complexity = complexity,
    this.imageUrl = imageUrl,
    this.duration = duration,
    this.ingredients = ingredients,
    this.steps = steps,
    this.isGlutenFree = isGlutenFree,
    this.isVegan = isVegan,
    this.isVegetarian = isVegetarian,
    this.isLactoseFree = isLactoseFree
  }
}

export default Meal;
```
Dummy datanya masih sama file yang tadi `data/dummy-data.js`.

Kita buat `MealItem.js` sebagai tampilan tiap meal:
```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import MealDetailScreen from "../screens/MealDetailScreen";
import { MEALS } from "../data/dummy-data";

const MealItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground 
            source={{ uri: props.image }} 
            style={styles.bgImage}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <Text>{props.duration}m</Text>
          <Text>{props.complexity.toUpperCase()}</Text>
          <Text>{props.affordability.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedModel = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedModel.title
  }
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 0},
    elevation: 2
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  mealRow: {
    flexDirection: "row"
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default MealItem;
```

Dan screennya kita update:
```js
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
```

Hasilnya: 
==gambar==



## Menambah Button pada Header

Install dulu packagenya:
```
npm install --save react-navigation-header-buttons
```
Juga untuk jaga2, jalankan juga ini:
```
npm install --save @expo/vector-icons
```

Kita buat CustomHeaderButton dulu di `components/HeaderButton.js`:
```js
import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={(Platform.OS === 'android') ? 'white' : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
```
Setelah itu kita tambahkan di headerRight di `MealDetailScreen.js`:
```js
MealDetailScreen.navigationOptions = navigationData => {
  ...
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
    )
  };
};
```
Seperti itu. Cobain, kalau bintang ditekan apakah `console.log` nya nendang atau tidak.
