import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import YourPlaylists from '../components/YourPlaylists';

const PlaylistScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <FeaturedPlaylists />
      <YourPlaylists />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
  },
});
