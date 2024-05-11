/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import type { Movie } from '../types/app';
import { API_ACCESS_TOKEN, API_URL } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movies/MovieList';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async (): Promise<void> => {
    const url = `${API_URL}/${id}`
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
      console.log(responseJson)
      setMovie(responseJson)
    } catch (error) {
      console.log('ERROR GET MOVIES', error)
    }
  }
  
  return (
    <ScrollView>
      {movie && (
        <View>
          <ImageBackground
            resizeMode="cover"
            style={styles.sizeImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
          >
            <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
          </LinearGradient>
          </ImageBackground>

          <View style={styles.movieBodyContainer}>
            <Text style={{  marginBottom: 10 }}>{movie.overview}</Text>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                  >Original Language</Text>
                  <Text>{movie.original_language}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                  >Popularity</Text>
                  <Text>{movie.popularity}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                  >Release Date</Text>
                  <Text>{movie.release_date}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 16 }}
                  >Vote Count</Text>
                  <Text>{movie.vote_count}</Text>
                </View>
              </View>
            </View>
          </View>
          <MovieList
              title='Recommendation'
              path={`${id}/recommendations`}
              coverType='poster'
          />
        </View>

      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sizeImage: {
    height: 200,
  },
  movieTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  },
  gradientStyle: {
    padding: 16,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    marginTop: 5
  },
  movieBodyContainer: {
    padding: 15,
    marginBottom: 40
  }
})

export default MovieDetail