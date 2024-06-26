/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Feather } from "@expo/vector-icons";
import Search from "../screens/Search";
import Favorite from "../screens/Favorite";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (): JSX.Element => {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home"
            component={Home}
            options={{ 
               tabBarIcon: ({ color }) => (
                  <Feather name="home" size={28} color={color} />
               ),
               headerShown: false,
             }}
         />
         <Tab.Screen
            name="Search"
            component={Search}
            options={{ 
               tabBarIcon: ({ color }) => (
                  <Feather name="search" size={28} color={color} />
               ),
               headerShown: false,
             }}
         />
         <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{ 
               tabBarIcon: ({ color }) => (
                  <Feather name="heart" size={28} color={color} />
               ),
               headerShown: false,
             }}
         />
      </Tab.Navigator>
   );
}

export default BottomTabNavigation;