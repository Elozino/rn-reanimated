import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export default function App() {
  const scale = useSharedValue(1); // For scaling content within the box
  const pinchScale = useSharedValue(width); // For controlling width of the box
  const heightScale = useSharedValue(40); // For controlling width of the box

  const pinch = Gesture.Pinch()
    .onStart(() => {
      pinchScale.value = width * scale.value;
      heightScale.value = 40 * scale.value // Store initial scaled width on pinch start
    })
    .onUpdate((event) => {
      console.log("event: ", event.scale);
      const newScale = clamp(pinchScale.value * event.scale, width / 2, width); // Clamp between 50% and 100% of screen width
      scale.value = newScale / width; // Calculate content scaling based on new width
      pinchScale.value = newScale; // Update pinchScale for next update
      heightScale.value = clamp(heightScale.value * event.scale, 40 / 2, 40)
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    width: withSpring(pinchScale.value), // Adjust width based on pinchScale with spring animation
    // transform: [{ scaleY: scale.value }],
    // height: height,
  }));

  const chatStyle = useAnimatedStyle(() => ({
    height: withSpring(heightScale.value)
  }))

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pinch}>
        <Animated.View style={[styles.box]}>
          <Animated.FlatList
            style={[boxAnimatedStyles, { backgroundColor: 'green', padding: 14, }]}
            data={Array(30).fill('This is me')}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ index }) => (
              <View style={{ alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end', marginVertical: 5 }}>
                <Animated.View style={[chatStyle, {
                  width: '80%', height: 40, backgroundColor: index % 2 === 0 ? 'blue' : 'grey',
                  borderRadius: 10,
                }]}></Animated.View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
          <View style={{position: 'absolute', right: 0, height, zIndex: -1}}>
            <Animated.FlatList
              style={{ width: width / 2, flex: 1 }}
              data={Array(30).fill('This is me')}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ index }) => (
                <View style={{ alignItems: 'flex-end', marginVertical: 10 }}>
                  <Animated.View style={[{
                    width: '60%', height: 20, backgroundColor: 'orange',
                    borderRadius: 10,
                  }]}></Animated.View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    flex: 1,

    backgroundColor: '#b58df1',
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: '50%',
    top: '50%',
    pointerEvents: 'none',
  },
});
