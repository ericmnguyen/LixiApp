import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { Audio } from 'expo-av';
import logo from './assets/tet.jpg';
import MoneyPack from './MoneyPack';
import MoneyDisplay from './MoneyDisplay';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [sound, setSound] = useState();

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

    playSound();

    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/bg-audio.mp3')
    );
    sound.setIsLoopingAsync(true);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

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
