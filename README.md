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
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf')
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

## Custom Back Butotn

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
