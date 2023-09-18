import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const WORDS = ['Hello!', 'Welcome', 'To', 'React', 'Native', 'Animation'];
const { width, height } = Dimensions.get('window')
const SIZE = width * 0.7

const part3 = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  });



  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {WORDS.map((word, index) => (
        <Page
          key={index.toString()}
          index={index}
          translateX={translateX}
          word={word}
        />
      ))
      }
    </Animated.ScrollView >
  )
}

export default part3

const Page = ({ index, word, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    )
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    )

    return {
      transform: [
        { scale }
      ],
      borderRadius,
      position: 'relative'
    }
  })

  const rTextStyle = useAnimatedStyle(() => {
    const text = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    )

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2]
    )
    return {
      transform: [
        { translateY: text }
      ],
      opacity
    }
  })
  return (
    <View style={[styles.page, { backgroundColor: `rgba(0, 0, 255, 0.${index + 2})` }]}>
      <Animated.View
        style={[styles.square, rStyle]}
      >
        <Animated.View style={rTextStyle}>
          <Animated.Text style={[styles.text]}>{word}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 255, .4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    fontFamily: 'Roboto',
    fontVariant: ['small-caps'],
    color: '#fff'
  }
})