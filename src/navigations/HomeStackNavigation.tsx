/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetail from "../screens/MovieDetail";
import { Button, StyleSheet, Text, View } from 'react-native'

const HomeScreen = ({ navigation }: any): JSX.Element => {
   return (
     <View style={styles.container}>
       <Text>Home Movie</Text>
       <Button
         title='Detail Movie'
         onPress={() => {navigation.navigate('MovieDetail')}}
       />
     </View>
   )
 }

const Stack = createNativeStackNavigator();

const HomeStackNavigation = (): JSX.Element => {
   return (
      <Stack.Navigator>
         <Stack.Screen name='HomeScreen' component={HomeScreen} />
         <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center'
   }
 })

export default HomeStackNavigation;