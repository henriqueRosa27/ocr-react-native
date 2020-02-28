import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Button,
  Alert,
  Text,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.viewButton}>
          <Button title="Carregar Foto" onPress={() => console.log(true)} />
          <View style={{backgroundColor: 'white', flex: 0.02}} />
          <Button
            disabled={true}
            title="Renderizar Imagem"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  viewButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default App;
