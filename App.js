import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import logo from './assets/tet.jpg';
import MoneyPack from './MoneyPack';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={logo}
        resizeMode='stretch'
        style={styles.background}>
        <MoneyPack />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
