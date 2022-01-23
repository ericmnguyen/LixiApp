import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import logo from './assets/tet.jpg';
import MoneyPack from './MoneyPack';
import MoneyDisplay from './MoneyDisplay';
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shakeNumb = 25;
    DeviceMotion.addListener((listener) => {
      const { acceleration } = listener;
      if (
        Math.abs(acceleration.x) > shakeNumb ||
        Math.abs(acceleration.y) > shakeNumb ||
        Math.abs(acceleration.z) > shakeNumb
      ) {
        // handleOpen()
        if (!isOpen) {
          setIsOpen(true);
        }
      }
    });

    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={logo}
        resizeMode='stretch'
        style={styles.background}>
        {isOpen ? <MoneyDisplay setIsOpen={setIsOpen} /> : <MoneyPack />}
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
