import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './src/navigations/BottomTabNavigation';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
