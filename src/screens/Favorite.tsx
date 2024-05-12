/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import type { Movie } from '../types/app';
import MovieItem from '../components/movies/MovieItem';

const Favorite = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getFavoriteMovies = async (): Promise<void> => {
    try {
      const initalData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log('Data Storage', initalData);

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
    getFavoriteMovies();
  }, [movies]);

  const renderItem = ({ item }: any): JSX.Element => {
    return (
      <TouchableOpacity style={{ padding: 10 }}>
          <MovieItem 
          movie={item}
          size={styles.poster}
          coverType='poster'
        />
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView>
      <FlatList
      style={{ padding: 20 }}
        data={movies}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  poster: {
    width: 100,
    height: 160,
  },
})
export default Favorite