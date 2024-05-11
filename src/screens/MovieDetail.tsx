/* eslint-disable react/react-in-jsx-scope */
import { Button, StyleSheet, Text, View } from "react-native";

const MovieDetail = ({ navigation }: any): JSX.Element => {
   return (
     <View style={styles.container}>
       <Text>Detail Movie</Text>
       <Button
         title='Ke Home'
         onPress={() => {navigation.navigate('HomeScreen')}}
       />
     </View>
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

 export default MovieDetail;