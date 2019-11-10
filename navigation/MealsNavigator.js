import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from "../constants/Colors";

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
    MealDetail: {
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

export default createAppContainer(MealsNavigator);
