import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Feather as Icon } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { bInterpolate, bInterpolateColor } from 'react-native-redash';

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ChevronProps {
  transition: Animated.Value<number>;
}

export default ({ transition }: ChevronProps) => {

  const { colors } = useTheme();
  
  const rotateZ = bInterpolate(transition, Math.PI, 0);
  const backgroundColor = bInterpolateColor(
    transition,
    { r: 0, g: 0, b: 0},
    // { r: 82, g: 82, b: 81 },
    // {r: 24, g: 49, b: 79},
    // {r: 249, g: 7, b: 76}, // red
    {r: 84, g: 151, b: 167},  // turquoise
    // {r: 39, g: 174, b: 95} // green
    // { r: 15, g: 123, b: 215 } // original blue button
  ) as Animated.Node<number>;
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }], backgroundColor }]}
    >
      <Icon name='chevron-down' color='white' size={24} />
    </Animated.View>
  );
};
