/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import type { Movie } from '../types/app';
import MovieItem from '../components/movies/MovieItem';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from './MovieDetail';

const Favorite = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const isFocused = useIsFocused();

  const getFavoriteMovies = async (): Promise<void> => {
    try {
      const initalData: string | null = await AsyncStorage.getItem('@FavoriteList');

      let favMovieList: Movie[] = [];

      if (initalData !== null) {
        favMovieList = [...JSON.parse(initalData)];
      }
      setMovies(favMovieList);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isFocused) {
      getFavoriteMovies();
    }
  }, [isFocused]);

  const renderItem = ({ item }: any): JSX.Element => {
    return (
      <TouchableOpacity style={{ padding: 5 }}>
          <MovieItem 
          movie={item}
          size={styles.poster}
          coverType='poster'
        />
      </TouchableOpacity>
    )
  }

  const FavoriteScreen = ({ navigation }: any): JSX.Element => {
    useFocusEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        navigation.replace('FavoriteScreen');
      });

      return unsubscribe;
    });

    return (
      <View>
        <FlatList
          style={{ padding: 10 }}
          data={movies}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
     </View>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='FavoriteScreen'>
      <Stack.Screen 
        name='FavoriteScreen' 
        component={FavoriteScreen}
        options={{ 
          title: 'Favorite'
         }}
      />
      <Stack.Screen 
        name='MovieDetail' 
        component={MovieDetail} 
        options={{ 
          title: 'Movie Detail'
         }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  poster: {
    width: 100,
    height: 160,
  },
})
export default Favorite