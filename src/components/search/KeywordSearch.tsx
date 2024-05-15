/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const KeywordSearch = (): JSX.Element => {
   const [keyword, setKeyword] = useState('');
   const [movies, setMovies] = useState<Movie[]>([]);

   const url = 'https://api.themoviedb.org/3';

   const getMovies = async (): Promise<void> => {
      try {
         const response = await fetch(`${url}//search/movie?api_key=8a73521c9198f5d872522a3057fe3253&query=${keyword}`);

         const responseJson = await response.json();
         setMovies(responseJson.results);
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <View>
      <View style={styles.container}>
         <TextInput
            value={keyword}
            onChangeText={setKeyword}
            defaultValue={keyword}
            style={styles.input}
            placeholder='Input title movie there'
            onSubmitEditing={() => {getMovies()}}
         />
         <FontAwesome name='search' size={16} />
      </View>
      <FlatList
         style={{ marginTop: 10 }}
         data={movies}
         numColumns={3}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
            <View style={{ padding: 5 }}>
               <MovieItem
                  movie={item}
                  coverType='poster'
                  size={styles.poster}
               />
            </View>
         )}
      />
   </View>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   input: {
      
   },
   poster: {
      width: 100,
      height: 160,
    },
})

export default KeywordSearch;