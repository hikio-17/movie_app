/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetail from "../screens/MovieDetail";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigation = (): JSX.Element => {
   return (
      <Stack.Navigator>
         <Stack.Screen 
            name='HomeScreen' 
            component={HomeScreen}
            options={{ 
               title: 'Home'
             }}
         />
         <Stack.Screen 
            name="MovieDetail" 
            component={MovieDetail}
            options={{ 
               title: 'Movie Detail'
             }}
         />
      </Stack.Navigator>
   )
}

export default HomeStackNavigation;