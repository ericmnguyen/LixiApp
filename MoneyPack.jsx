import React, { useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Animated, PanResponder, LogBox } from 'react-native';
import luckyMoney from './assets/baolixi.png';

const MoneyPack = () => {
  const duration = 500;

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    Animated.timing(ani, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start();
    Animated.sequence([
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: -1000
        },
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: 50
        },
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(pan, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pan, { toValue: { x: 0, y: 0 }, duration: 2000, useNativeDriver: true }),
          Animated.timing(pan, { toValue: { x: 10, y: 0 }, duration: 100, useNativeDriver: true }),
          Animated.timing(pan, { toValue: { x: -10, y: 0 }, duration: 100, useNativeDriver: true }),
          Animated.timing(pan, { toValue: { x: 10, y: 0 }, duration: 100, useNativeDriver: true }),
          Animated.timing(pan, { toValue: 0, duration: 100, useNativeDriver: true })
        ])
      )
    ]).start();
  }, []);

  const pan = useRef(new Animated.ValueXY()).current;
  const ani = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true, }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: ani
        }}
        {...panResponder.panHandlers}
      >
        <Image
          style={styles.moneyPack}
          source={luckyMoney}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    shadowOffset: {
      width: 9,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  moneyPack: {
    width: 500,
    height: 800,
    resizeMode: 'contain',
    zIndex: 2
  },
});

export default MoneyPack