import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat
} from 'react-native-reanimated';
import NavButton from '../component/NavButton';


const SIZE = 100.0

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
}

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * SIZE / 2,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(progress) }
      ],
    }
  }, [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(.5), 3, true)
    scale.value = withRepeat(withSpring(1), 3, true)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[
        { height: SIZE, width: SIZE, backgroundColor: 'blue' },
        reanimatedStyle
      ]} />
      <NavButton
        title='Next'
        path='/part4'
        style={{ marginTop: 100 }}
      />
    </View>
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
