import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';

import DynamicFlatlist from './DynamicFlatlist';

const Featured: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text style={styles.playlistTitle}>Popular Playlists</Text>
      <DynamicFlatlist
        url="https://api.spotify.com/v1/browse/featured-playlists"
        type="playlists"
        onPress={item => navigation.navigate('Details', {data: item})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistTitle: {fontSize: 24, padding: 10, fontWeight: 'bold'},
});

export default Featured;
