import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const LIST_ITEM_HEIGHT = 54;
export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

export default ({ item, isLast }: ListItemProps) => {
  const { colors } = useTheme();

  const bottomRadius = isLast ? 8 : 0;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderColor: colors.background,
      height: LIST_ITEM_HEIGHT,
    },
    name: {
      fontSize: 16,
    },
    pointsContainer: {
      borderRadius: 15,
      backgroundColor: colors.backgroundCard,
      padding: 8,
    },
    points: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
      ]}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
      </View>
    </View>
  );
};
