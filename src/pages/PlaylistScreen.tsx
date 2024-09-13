import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import SearchBar from '../components/SearchBar';
import ChosenPlaylists from '../components/ChosenPlaylists';

const PlaylistScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <SearchBar />
      <FeaturedPlaylists />
      <ChosenPlaylists />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
