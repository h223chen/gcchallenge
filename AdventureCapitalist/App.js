import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import config from './config/development';
import StorageManager from './src/managers/StorageManager';

export default function App() {
  global.config = config;
  global.storage = StorageManager.getInstance();  
  global.storage.loadBlob();  

  return (
    <View style={styles.container}>
      <GameScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'black'
  },
});
