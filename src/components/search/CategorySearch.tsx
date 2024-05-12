/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { API_ACCESS_TOKEN } from '@env'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const getGenres = async (): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    try {
      const response = await fetch(url, options)

      const responseJson = await response.json()
      setGenres(responseJson.genres)
    } catch (error) {
      console.log(error)
    }
  }

  const getMoviesByGnre = async (id: number): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/discover/movie'

    try {
      const response = await fetch(`${url}?api_key=8a73521c9198f5d872522a3057fe3253&with_genres=${selectedGenre?.id}`)

      const responseJson = await response.json()
      setMovies(responseJson.results);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   getGenres();
  }, []);

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

  return (
    <View style={[styles.container, { height: '100%', paddingBottom: 250, width: '100%'}]}>
        {movies.length > 0 ? (
          <FlatList
          data={movies}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        ) : (
           <View>
           <FlatList
                 data={genres}
                 numColumns={2}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({ item }) => (
                     <TouchableOpacity style={{ ...styles.containerGenre, backgroundColor: selectedGenre?.name === item.name ? 'red' : '#F3CCF3' }} onPress={() => {setSelectedGenre(item)}}>
                       <Text style={styles.text}>{item.name}</Text>
                     </TouchableOpacity>
                 )}
           />
           <Button title='Search' onPress={() => {getMoviesByGnre(selectedGenre?.id)}} />
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 15
   },
   containerGenre: {
      width: '48%',
      padding: 10,
      margin: 5,
      borderRadius: 15
   },
   text: {
      textAlign: 'center',
      color: '#000',
      fontSize: 16
   },
   poster: {
    width: 100,
    height: 160,
  },
})

export default CategorySearch
