import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Thumbnail from './Thumbnail';

export default function InfoWindow({ currentTruck }) {
  const truncate = (elem: string, limit: number, after: string) => {
    if (!elem || !limit) return;
    let content = elem.trim();
    content = `${content.slice(0, limit)}${after}`;
    return content;
  };
  const { full_name, blurb, logo, star_average } = currentTruck;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Thumbnail logo={logo} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${truncate(
          full_name,
          28,
          ''
        )}`}</Text>
      </View>
      <View>
        <Text>{`${truncate(blurb, 30, '...')}`}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(star_average))}
        </Text>
        <Text style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(star_average))}
        </Text>
      </View>
      <View>
        <Text>{`${star_average} stars`}</Text>
      </View>
    </View>
  );
}
