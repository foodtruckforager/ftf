import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableWithoutFeedback,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, bin, useTransition } from 'react-native-redash';
import Chevron from './Chevron';
import Item, { LIST_ITEM_HEIGHT, ListItem } from './ListItem';

const { not, interpolate } = Animated;

export interface Badges {
  name: string;
  items: ListItem[];
}

interface ListProps {
  badges: Badges;
}

export default ({ badges }: ListProps) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease),
  );
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * badges.items.length,
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });
  return (
    <>
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
          <Tooltip
            containerStyle={styles.toolTipContainerStyle}
            popover={(
              <View>
                <Text style={styles.toolTipPopover}>
                  Scan Truck QR Codes to Earn Badges!
                </Text>
                <Text />
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>I Got Trucked</Text>
                  - visit 3 trucks
                </Text>
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>Parliament Truck-a-Delic</Text>
                  - visit 10 trucks
                </Text>
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>Feast Mode</Text>
                  - visit 30 trucks
                </Text>
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>Around The World</Text>
                  - visit 5 different trucks
                </Text>
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>Berserker</Text>
                  - visit same truck 3x in 1 day
                </Text>
                <Text style={styles.toolTipPopover}>
                  <Text style={styles.toolTipBadgesTitle}>The Regular</Text>
                  - visit same truck 5x in 1 week
                </Text>
              </View>
        )}
          >
            <Text style={styles.title}>Badges</Text>
          </Tooltip>
          <Chevron {...{ transition }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {badges.items.map((item, key) => (
          <Item {...{ item, key }} isLast={key === badges.items.length - 1} />
        ))}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'white',
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
  toolTipContainerStyle: {
    width: 300,
    height: 150,
  },
  toolTipPopover: {
    color: 'white',
  },
  toolTipBadgesTitle: {
    textDecorationLine: 'underline',
  },
});
