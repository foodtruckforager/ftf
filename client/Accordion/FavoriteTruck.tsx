import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'react-native-paper';

import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, bin, useTransition } from 'react-native-redash';
import Chevron from './Chevron';
import Item, { LIST_ITEM_HEIGHT, ListItem } from './ListItem';

const { not, interpolate } = Animated;

export interface FavoriteTruck {
  name: string;
  items: ListItem[];
}
interface ListProps {
  favoriteTrucks: FavoriteTruck;
}

export default ({ favoriteTrucks }: ListProps) => {
  const [open, setOpen] = useState(false);

  const { colors } = useTheme();

  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease)
  );
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * favoriteTrucks.items.length
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: colors.background,
    },
    container: {
      marginTop: 16,
      backgroundColor: colors.background,
      padding: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    items: {
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.topContainer}>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <Text style={styles.title}>Favorite Trucks</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {favoriteTrucks.items.map((item, key) => (
          <Item
            {...{ item, key }}
            isLast={key === favoriteTrucks.items.length - 1}
          />
        ))}
      </Animated.View>
    </View>
  );
};
