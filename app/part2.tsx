import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Link } from 'expo-router'
import NavButton from '../component/NavButton';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2

type IContext = {
  translateX: number;
  translateY: number;
}

const part2 = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, IContext>({
    onStart: (event, context) => {
      // getting previous state (position of object)
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      // moving the object position
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)
      // resetting to initial position
      if (distance < (CIRCLE_RADIUS + (SIZE / 2))) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <View style={[styles.container]}>
      <View style={[styles.circle]}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler >
      </View>
      <NavButton
        title='Next'
        path='/part3'
        style={{ marginTop: 100 }}
      />
    </View >
  )
}

export default part2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,255, 0, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(2, 44, 96, 0.6)'
  }
})